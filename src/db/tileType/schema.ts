import { pgEnum } from "drizzle-orm/pg-core";

const tileType = pgEnum("tile_type", [
  "grass",
  "rock",
  "water",
  "snow",
  "sand",
  "farmland",
]);

export { tileType };
