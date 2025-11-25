import { jwt, type JwtVariables } from "hono/jwt";
import { createRouter, IEnv } from "./index";
import cityRouter from "./city/index";
import { TSafeUser } from "$db/user/types";

type TProtectedVariables = JwtVariables<TSafeUser>;

const router = createRouter()
  .use((c, next) => {
    const jwtMiddleware = jwt({
      cookie: "auth-token",
      secret: c.env.JWT_SECRET,
    });

    return jwtMiddleware(c, next);
  })
  .route("/city", cityRouter);

export default router;
export { TProtectedVariables };
