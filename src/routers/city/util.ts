import { Next } from "hono";
import {
  createDocumentService,
  createSQLService,
  createGraphService,
} from "./service";
import { ICityEnv } from "./types";
import { createServiceInjecter } from "$routers/util";
import { TContext } from "$routers/types";

const injectCityService = (c: TContext<ICityEnv>, next: Next) => {
  return createServiceInjecter(
    () => c.set("cityService", createSQLService(c.env.DB_URL)),
    () => c.set("cityService", createDocumentService(c.env.DOCUMENT_DB_URL)),
    () => c.set("cityService", createGraphService()),
  )(c, next);
};

export { injectCityService };
