import { Next } from "hono";
import { createDocumentService, createSQLService } from "./service";
import { IAuthEnv } from "./types";
import { TContext } from "$routers/types";
import { createServiceInjecter } from "$routers/util";

const injectUserService = (c: TContext<IAuthEnv>, next: Next) => {
  return createServiceInjecter(
    () => c.set("userService", createSQLService(c.env.DB_URL)),
    () => c.set("userService", createDocumentService(c.env.DOCUMENT_DB_URL)),
    () => {},
  )(c, next);
};

export { injectUserService };
