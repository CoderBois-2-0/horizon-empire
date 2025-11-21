import { drizzle } from "drizzle-orm/node-postgres";
import * as mapSchema from "./map/schema.js";
import * as regionSchema from "./region/schema.js";
import * as userSchema from "./user/schema.js";
import * as tileTypeSchema from "./tileType/schema.js";
import * as tileSchema from "./tile/schema.js";
import * as citySchema from "./city/schema.js";
import * as buildingSchema from "./building/schema.js";
import * as inventorySchema from "./inventory/schema.js";
import * as resourceSchema from "./resource/schema.js";
import * as placedBuildingSchema from "./placedBuilding/schema.js";
import * as personSchema from "./person/schema.js";
import * as inventoryResourceSchema from "./inventoryResource/schema.js";
import * as jobSchema from "./job/schema.js";
import * as regionResourceCostSchema from "./regionResourceCost/schema.js";
import * as buildingResourceCostSchema from "./buildingResourceCost/schema.js";
import * as auditPlacedBuildingSchema from "./auditPlacedBuilding/schema.js";
import * as incomeGroupSchema from "./incomeGroup/schme.js";

function generateID() {
  return crypto.randomUUID();
}

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
      ...inventorySchema,
      ...resourceSchema,
      ...placedBuildingSchema,
      ...personSchema,
      ...inventoryResourceSchema,
      ...jobSchema,
      ...regionResourceCostSchema,
      ...buildingResourceCostSchema,
      ...auditPlacedBuildingSchema,
      ...incomeGroupSchema,
    },
  });
}

type TDB = ReturnType<typeof connectDB>;

export { connectDB, generateID, TDB };
