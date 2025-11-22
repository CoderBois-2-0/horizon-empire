import { createRouter, TContext, IEnv } from "$routers/index";
import { RegionHandler } from "$db/region/handler";
import { regionQueryValidator } from "./validation";

const regionRouter = createRouter();

regionRouter.get("/region", regionQueryValidator, async (c: TContext<IEnv>) => {
  try {
    const handler = new RegionHandler(process.env.DB_URL!);

    const regions = await handler.getAll();
    return c.json(regions);
  } catch {
    return c.json({ error: "Failed to fetch regions" }, 500);
  }
});

regionRouter.put("/region/:regionID/unlock", async (c: TContext<IEnv>) => {
  try {
    const { regionID } = c.req.param();
    const handler = new RegionHandler(process.env.DB_URL!);

    await handler.unlockRegion(regionID);
    return c.json({ message: "Region unlocked successfully" });
  } catch {
    return c.json({ error: "Failed to unlock region" }, 500);
  }
});

export { regionRouter };
