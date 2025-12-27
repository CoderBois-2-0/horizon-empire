import { createDocumentService, createSQLService } from "./service";
import { createMiddleware } from "hono/factory";
import { IAuthEnv } from "./types";

const injectUserService = createMiddleware<IAuthEnv>(async (c, next) => {
  const { db } = c.req.query();

  switch (db) {
    case undefined:
      return c.json({ message: "The db query parameter is required" }, 400);
    case "sql":
      c.set("userService", createSQLService(c.env.DB_URL));
      break;
    case "document":
      c.set("userService", createDocumentService(c.env.DOCUMENT_DB_URL));
      break;
    default:
      return c.json(
        {
          message:
            "The db query parameter did not match 'sql', 'document' or 'graph'",
        },
        400,
      );
  }

  return next();
});

export { injectUserService };
