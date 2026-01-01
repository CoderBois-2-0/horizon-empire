import { createRouter, TContext, IEnv } from "$routers/index";
import { BuildingHandler } from "$db/sql/building/handler";
import { IBuilding } from "$db/sql/building/types";

const buildingRouter = createRouter();

buildingRouter.get("/buildings", async (c: TContext<IEnv>) => {
  const buildingHandler = new BuildingHandler(c.env.DB_URL);

  const buildings: IBuilding[] = await buildingHandler.getAll();

  return c.json({ buildings });
});

export { buildingRouter };
