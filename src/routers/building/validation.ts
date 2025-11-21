// import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";

const buildingQuerySchema = z
  .object({
    id: z.string().optional(),
  })
  .strict();

const buildingQueryValidator = (data: unknown) => {
  return buildingQuerySchema.parse(data);
}

export { buildingQueryValidator };
