import { jwt } from "hono/jwt";
import { createRouter } from "./index";

const router = createRouter().use((c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  });

  return jwtMiddleware(c, next);
});

export default router;
