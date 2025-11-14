import { UserHandler } from "$db/user/handler";
import { createRouter, IEnv } from "$routers/index";

interface IAuthEnv extends IEnv {
	Variables: {
		userHandler: UserHandler;
	}
}

const router = createRouter<IAuthEnv>()
	.use(async (c, next) => {
		c.set("userHandler", new UserHandler(c.env.DB_URL));

		await next();
	})
	.post("/sign-up", (c) => {
		const userHandler = c.get("userHandler");

		return c.json({ message: "Not implemented" }, 500)
	})
	.post("/login", (c) => {
		const userHandler = c.get("userHandler");

		return c.json({ message: "Not implemented" }, 500)
	})
	.get("/sign-out", (c) => {
		const userHandler = c.get("userHandler");

		return c.json({ message: "Not implemented" }, 500)
	});

export default router;
