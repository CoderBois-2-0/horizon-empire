import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";

export const regionQuerySchema = z
  .object({
    name: z.string().optional(),
    mapID: z.string().optional(),
    isUnlocked: z
      .preprocess((val) => {
        if (val === "true") return true;
        if (val === "false") return false;
        return val;
      }, z.boolean())
      .optional(),
  })
  .strict();

export const regionQueryValidator = zValidator("query", regionQuerySchema);
