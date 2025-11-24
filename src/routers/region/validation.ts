import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";

export const regionQuerySchema = z
  .object({
    mapID: z.string().optional(),
  })
  .strict();

export const regionQueryValidator = zValidator("query", regionQuerySchema);

export const regionPutSchema = z
  .object({
    isUnlocked: z.boolean().optional(),
  })
  .strict();

export const regionPutValidator = zValidator("json", regionPutSchema);
