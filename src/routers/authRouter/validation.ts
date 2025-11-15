import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";

const signUpSchema = z
  .object({
    username: z.string().min(2).max(16),
    password: z.string().min(8).max(20),
    "confirm-password": z.string(),
  })
  .strict()
  .refine((value) => value.password === value["confirm-password"]);

const signUpValidator = zValidator("json", signUpSchema);

const loginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

const loginValidator = zValidator("json", loginSchema);

export { signUpValidator, loginValidator };
