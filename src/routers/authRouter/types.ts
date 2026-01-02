import { IEnv } from "$routers/types";
import z from "zod/v4";
import { loginSchema, signUpSchema } from "./validation";
import { IUserService } from "./service";

interface IAuthEnv extends IEnv {
  Variables: {
    userService: IUserService;
  };
}

type TSignUpUser = z.infer<typeof signUpSchema>;
type TLoginUser = z.infer<typeof loginSchema>;

export { IAuthEnv, TSignUpUser, TLoginUser };
