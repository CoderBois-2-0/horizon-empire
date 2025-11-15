import { sign } from "hono/jwt";

import { UserHandler } from "$db/user/handler";
import { TSafeUser } from "$db/user/types";
import { createRouter, IEnv, TContext } from "$routers/index";
import { loginValidator, signUpValidator } from "./validation";
import { deleteCookie, setCookie } from "hono/cookie";

interface IAuthEnv extends IEnv {
  Variables: {
    userHandler: UserHandler;
  };
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
    const user = await userHandler.findByUsername(
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
