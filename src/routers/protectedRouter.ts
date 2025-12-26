import { jwt } from "hono/jwt";
import { authTokenName, createRouter } from "./util";
import cityRouter from "./city/index";

const router = createRouter()
  .use((c, next) => {
    const jwtMiddleware = jwt({
      cookie: authTokenName,
      secret: c.env.JWT_SECRET,
    });

    return jwtMiddleware(c, next);
  })
  .route("/city", cityRouter);

export default router;
