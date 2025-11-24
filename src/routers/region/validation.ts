import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";

export const regionQuerySchema = z
  .object({
    mapID: z.string().optional(),
  })
  .strict();

export const regionQueryValidator = zValidator("query", regionQuerySchema);

export const regionUnlockSchema = z
  .object({
    isUnlocked: z.boolean(),
    inventoryID: z.string(),
  })
  .strict();

export const regionUnlockValidator = zValidator("json", regionUnlockSchema);
