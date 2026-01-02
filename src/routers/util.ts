import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

import { IEnv, TContext } from "./types";
import { TSafeUser } from "$db/sql/user/types";
import { IAuthEnv } from "./authRouter/types";
import { createMiddleware } from "hono/factory";

/**
 * @description
 * A helper function for creating routers, applies the correct typing for cloudflare bindings but can be extended via the IEnv interface
 */
function createRouter<TEnv extends IEnv = IEnv>() {
  return new Hono<TEnv>();
}

const authTokenName = "auth-token";

async function setAuthCookie(c: TContext<IAuthEnv>, payload: TSafeUser) {
  const jwt = await sign(payload, c.env.JWT_SECRET);

  setCookie(c, authTokenName, jwt, {
    path: "/",
    httpOnly: true,
    // Should set max age to 3 days from when the cookies was set
    maxAge: 60 * 60 * 24 * 3,
  });
}

function createServiceInjecter(
  createSQLService: () => void,
  createDocumentService: () => void,
  createGraphService: () => void,
) {
  return createMiddleware(async (c, next) => {
    const { db } = c.req.query();

    switch (db) {
      case undefined:
        return c.json({ message: "The db query parameter is required" }, 400);
      case "sql":
        createSQLService();
        break;
      case "document":
        createDocumentService();
        break;
      case "graph":
        createGraphService();
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
}

export { createRouter, authTokenName, setAuthCookie, createServiceInjecter };
