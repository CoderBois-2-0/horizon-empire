import { mapSize, mapType } from "$db/map/schema";
import { zValidator } from "@hono/zod-validator";
import z from "zod/v4";

const cityPostSchema = z.object({
  name: z.string().min(2).max(32),
  mapType: z.enum(mapType.enumValues),
  mapSize: z.enum(mapSize.enumValues),
});

const createCityValidator = zValidator("json", cityPostSchema);

export { createCityValidator };
