import z from "zod/v4";
import { IEnv, TProtectedVariables } from "$routers/types";
import { cityPostSchema } from "./validation";
import { ICityService } from "./service";

interface ICityVariables extends TProtectedVariables {
  cityService: ICityService;
}

interface ICityEnv extends IEnv {
  Variables: ICityVariables;
}

type TCityRequest = z.infer<typeof cityPostSchema>;

export { ICityEnv, TCityRequest };
