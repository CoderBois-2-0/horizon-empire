import { UserHandler } from "$db/sql/user/handler";
import { IEnv } from "$routers/types";

interface IAuthEnv extends IEnv {
  Variables: {
    userHandler: UserHandler;
  };
}

export { IAuthEnv };
