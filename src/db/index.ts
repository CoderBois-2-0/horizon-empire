import { drizzle } from "drizzle-orm/neon-http";
import * as mapSchema from "./map/schema.js";
import * as regionSchema from "./region/schema.js";
import * as userSchema from "./user/schema.js";
import * as tileTypeSchema from "./tileType/schema.js";
import * as tileSchema from "./tile/schema.js";
import * as citySchema from "./city/schema.js";
import * as buildingTable from "./building/schema.js";

function connectDB(dbUrl: string) {
  return drizzle(dbUrl, {
    schema: {
      ...userSchema,
      ...regionSchema,
      ...mapSchema,
      ...tileTypeSchema,
      ...tileSchema,
      ...citySchema,
      ...buildingTable,
    },
  });
}

export { connectDB };
