import { deleteCookie } from "hono/cookie";
import { authTokenName, createRouter, setAuthCookie } from "$routers/util";
import { IAuthEnv } from "./types";
import { loginValidator, signUpValidator } from "./validation";
import { injectUserService } from "./util";

const router = createRouter<IAuthEnv>()
  .use((c, next) => injectUserService(c, next))
  .post("/sign-up", signUpValidator, async (c) => {
    const userHandler = c.get("userService");

    const userRequest = c.req.valid("json");
    const createdUser = await userHandler.create(userRequest);

    await setAuthCookie(c, createdUser);

    return c.json({ message: "User created" }, 200);
  })
  .post("/login", loginValidator, async (c) => {
    const userHandler = c.get("userService");

    const userRequest = c.req.valid("json");
    const user = await userHandler.findByUserCredentials({
      username: userRequest.username,
      password: userRequest.password,
    });

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
