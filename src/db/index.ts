import { drizzle } from "drizzle-orm/neon-http";
import * as mapSchema from "./map/schema.js";
import * as regionSchema from "./region/schema.js";
import * as userSchema from "./user/schema.js";
import * as tileTypeSchema from "./tileType/schema.js";
import * as tileSchema from "./tile/schema.js";
import * as citySchema from "./city/schema.js";
import * as buildingSchema from "./building/schema.js";
import * as resourceInventorySchema from "./resourceInventory/schema.js";
import * as resourceSchema from "./resource/schema.js";
import * as placedBuildingSchema from "./placedBuilding/schema.js";
import * as personSchema from "./person/schema.js";
import * as resourceJunctionSchema from "./resourceJunction/schema.js";
import * as jobSchema from "./job/schema.js";
import * as occupationSchema from "./occupation/schema.js";

function connectDB(dbUrl: string) {
  return drizzle(dbUrl, {
    schema: {
      ...userSchema,
      ...regionSchema,
      ...mapSchema,
      ...tileTypeSchema,
      ...tileSchema,
      ...citySchema,
      ...buildingSchema,
      ...resourceInventorySchema,
      ...resourceSchema,
      ...placedBuildingSchema,
      ...personSchema,
      ...resourceJunctionSchema,
      ...jobSchema,
      ...occupationSchema,
    },
  });
}

export { connectDB };
