import { createRouter, TContext, IEnv } from "$routers/index";
import { BuildingHandler } from "$db/building/handler";
import { IBuilding } from "$db/building/types";
import { buildingQueryValidator } from "./validation";


const buildingRouter = createRouter();

buildingRouter.get("/buildings", buildingQueryValidator, async (c: TContext<IEnv>) => {
  const buildingHandler = new BuildingHandler(c.env.DB_URL);

  const buildings: IBuilding[] = await buildingHandler.getAll(
  );

  return c.json({ buildings });
});

export { buildingRouter };

