import { createRouter } from "$routers/util";
import { injectBuildingService } from "./util";
import { IBuildingEnv } from "./types";

const router = createRouter<IBuildingEnv>()
  .use((c, next) => injectBuildingService(c, next))
  .get("/buildings", async (c) => {
    const buildingService = c.get("buildingService");

    const buildings = await buildingService.getAll();

    return c.json({ buildings });
  });

export default router;
