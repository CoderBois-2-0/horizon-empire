import { Hono } from "hono";
import publicRouter from "./publicRouter"

interface IEnv {
	Bindings: CloudflareBindings;
}

/**
 * @description
 * A helper function for creating routers, applies the correct typing for cloudflare bindings but can be extended via the IEnv interface
 */
function createRouter<TEnv extends IEnv = IEnv>() {
	return new Hono<TEnv>();
}

const app = createRouter()
	.route("/", publicRouter);

export default app;
export { createRouter, IEnv };
