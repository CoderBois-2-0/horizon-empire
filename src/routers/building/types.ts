import { IEnv } from "$routers/types";
import { IBuildingService } from "./service";

interface IBuildingEnv extends IEnv {
  Variables: {
    buildingService: IBuildingService;
  };
}

export { IBuildingEnv };
