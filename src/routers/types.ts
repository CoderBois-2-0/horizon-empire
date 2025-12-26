import { Context } from "hono";
import { type JwtVariables } from "hono/jwt";
import { TSafeUser } from "$db/sql/user/types";

interface IEnv {
  Bindings: CloudflareBindings;
}

/**
 * @description
 * A helper type in case a function needs to accept the context parameter
 */
type TContext<TEnv extends IEnv = IEnv> = Context<TEnv>;

type TProtectedVariables = JwtVariables<TSafeUser>;

export { IEnv, TContext, TProtectedVariables };
