import { createRouter } from "$routers/util";
import { ICityEnv } from "./types";
import { injectCityService } from "./util";
import { createCityValidator } from "./validation";

const router = createRouter<ICityEnv>()
  .use((c, next) => injectCityService(c, next))
  .post("/", createCityValidator, async (c) => {
    const cityService = c.get("cityService");

    const user = c.get("jwtPayload");
    const cityRequest = c.req.valid("json");

    await cityService.createCity(user.id, cityRequest);

    return c.json({ message: "City created" });
  });

export default router;
