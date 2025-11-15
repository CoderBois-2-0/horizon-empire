import { Context, Hono } from "hono";
import publicRouter from "./publicRouter";
import protectedRouter from "./protectedRouter";

interface IEnv {
  Bindings: CloudflareBindings;
}

/**
 * @description
 * A helper type in case a function needs to accept the context parameter
 */
type TContext<TEnv extends IEnv = IEnv> = Context<TEnv>;

/**
 * @description
 * A helper function for creating routers, applies the correct typing for cloudflare bindings but can be extended via the IEnv interface
 */
function createRouter<TEnv extends IEnv = IEnv>() {
  return new Hono<TEnv>();
}

const app = createRouter().route("/", publicRouter).route("/", protectedRouter);

export default app;
export { createRouter, IEnv, TContext };
