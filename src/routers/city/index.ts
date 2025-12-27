import { CityHandler } from "$db/sql/city/handler";
import { createRouter } from "$routers/util";
import { IEnv, TProtectedVariables } from "$routers/types";
import { createCityValidator } from "./validation";

interface ICityVariables extends TProtectedVariables {
  cityHandler: CityHandler;
}

interface ICityEnv extends IEnv {
  Variables: ICityVariables;
}

const router = createRouter<ICityEnv>()
  .use(async (c, next) => {
    const cityHandler = new CityHandler(c.env.DB_URL);

    c.set("cityHandler", cityHandler);

    await next();
  })
  .post("/", createCityValidator, async (c) => {
    const cityHandler = c.get("cityHandler");

    const user = c.get("jwtPayload");
    const cityRequest = c.req.valid("json");

    await cityHandler.createCity({
      ...cityRequest,
      userID: user.id,
      cityName: cityRequest.name,
    });

    return c.json({ message: "City created" });
  });

export default router;
