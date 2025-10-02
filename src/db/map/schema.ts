import { pgEnum } from "drizzle-orm/pg-core";

const mapType = pgEnum("map_type", ["forrest", "arctic", "desert", "bay"]);

export { mapType };
