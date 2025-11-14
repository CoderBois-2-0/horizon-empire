import { UserHandler } from "$db/user/handler";
import { createRouter, IEnv } from "$routers/index";
import { signUpValidator } from "./validation";

interface IAuthEnv extends IEnv {
	Variables: {
		userHandler: UserHandler;
	};
}

const router = createRouter<IAuthEnv>()
	.use(async (c, next) => {
		c.set("userHandler", new UserHandler(c.env.DB_URL));

		await next();
	})
	.post("/sign-up", signUpValidator, async (c) => {
		const userHandler = c.get("userHandler");

		const userRequest = c.req.valid("json");
		await userHandler.create(userRequest);

		return c.json({ message: "User created" }, 200);
	})
	.post("/login", (c) => {
		const userHandler = c.get("userHandler");

		return c.json({ message: "Not implemented" }, 500);
	})
	.get("/sign-out", (c) => {
		const userHandler = c.get("userHandler");

		return c.json({ message: "Not implemented" }, 500);
	});

export default router;
