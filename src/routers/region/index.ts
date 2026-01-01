import { createRouter } from "$routers/index";
import { RegionHandler } from "$db/sql/region/handler";
import { regionQueryValidator, regionUnlockValidator } from "./validation";

const regionRouter = createRouter();

regionRouter.get("/region", regionQueryValidator, async (c) => {
  try {
    const handler = new RegionHandler(process.env.DB_URL!);
    const regions = await handler.getAll();

    return c.json(regions);
  } catch {
    return c.json({ error: "Failed to fetch regions" }, 500);
  }
});

regionRouter.put(
  "/region/:regionID/unlock",
  regionUnlockValidator,
  async (c) => {
    try {
      const { regionID } = c.req.param();
      const { inventoryID, isUnlocked } = c.req.valid("json"); // validated JSON input
      const handler = new RegionHandler(process.env.DB_URL!);
      const canUnlock = await handler.canUnlock(regionID, inventoryID);

      if (!canUnlock) {
        return c.json({ error: "Cannot unlock region" }, 403);
      }

      await handler.unlockRegion(regionID, inventoryID, isUnlocked);

      return c.json({ message: "Region unlocked successfully" });
    } catch (err) {
      console.error("Unlock error:", err);
      return c.json({ error: "Failed to unlock region" }, 500);
    }
  },
);
export { regionRouter };
