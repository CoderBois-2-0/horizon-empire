import { createRouter } from "$routers/index";
import { RegionHandler } from "$db/region/handler";
import { regionQueryValidator } from "./validation";

const regionRouter = createRouter();

regionRouter.get("/region", regionQueryValidator, async (c) => {
  try {
    const handler = new RegionHandler(process.env.DB_URL!);

    const { mapID } = c.req.valid("query");

    const regions = await handler.getAll({ mapID });

    return c.json(regions);
  } catch {
    return c.json({ error: "Failed to fetch regions" }, 500);
  }
});

export { regionRouter };
