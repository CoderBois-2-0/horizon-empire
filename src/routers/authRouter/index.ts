import { UserHandler } from "$db/sql/user/handler";
import { authTokenName, createRouter, setAuthCookie } from "$routers/util";
import { IAuthEnv } from "./types";
import { loginValidator, signUpValidator } from "./validation";
import { deleteCookie } from "hono/cookie";

const router = createRouter<IAuthEnv>()
  .use(async (c, next) => {
    c.set("userHandler", new UserHandler(c.env.DB_URL));

    await next();
  })
  .post("/sign-up", signUpValidator, async (c) => {
    const userHandler = c.get("userHandler");

    const userRequest = c.req.valid("json");
    const createdUser = await userHandler.create(userRequest);

    await setAuthCookie(c, createdUser);

    return c.json({ message: "User created" }, 200);
  })
  .post("/login", loginValidator, async (c) => {
    const userHandler = c.get("userHandler");

    const userRequest = c.req.valid("json");
    const user = await userHandler.findByUserCredentials(
      userRequest.username,
      userRequest.password,
    );

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    await setAuthCookie(c, user);

    return c.json(user);
  })
  .get("/sign-out", (c) => {
    deleteCookie(c, authTokenName);

    return c.json({ message: "User signed out" });
  });

export default router;
