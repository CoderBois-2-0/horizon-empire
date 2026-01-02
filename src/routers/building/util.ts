import { Next } from "hono";
import { createDocumentService, createSQLService } from "./service";
import { IBuildingEnv } from "./types";
import { TContext } from "$routers/types";
import { createServiceInjecter } from "$routers/util";

const injectBuildingService = (c: TContext<IBuildingEnv>, next: Next) => {
  return createServiceInjecter(
    () => c.set("buildingService", createSQLService(c.env.DB_URL)),
    () =>
      c.set("buildingService", createDocumentService(c.env.DOCUMENT_DB_URL)),
    () => {},
  )(c, next);
};

export { injectBuildingService };
