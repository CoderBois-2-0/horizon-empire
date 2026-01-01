import { drizzle } from "drizzle-orm/node-postgres";
import * as mapSchema from "./sql/map/schema.js";
import * as regionSchema from "./region/schema.js";
import * as userSchema from "./sql/user/schema.js";
import * as tileTypeSchema from "./sql/tileType/schema.js";
import * as tileSchema from "./sql/tile/schema.js";
import * as citySchema from "./sql/city/schema.js";
import * as buildingSchema from "./sql/building/schema.js";
import * as inventorySchema from "./inventory/schema.js";
import * as resourceSchema from "./sql/resource/schema.js";
import * as placedBuildingSchema from "./sql/placedBuilding/schema.js";
import * as personSchema from "./sql/person/schema.js";
import * as inventoryResourceSchema from "./sql/inventoryResource/schema.js";
import * as jobSchema from "./sql/job/schema.js";
import * as regionResourceCostSchema from "./sql/regionResourceCost/schema.js";
import * as buildingResourceCostSchema from "./sql/buildingResourceCost/schema.js";
import * as auditPlacedBuildingSchema from "./sql/auditPlacedBuilding/schema.js";
import * as incomeGroupSchema from "./sql/incomeGroup/schema.js";
import * as buildingTileTypeSchema from "./sql/buildingTileType/schema.js";
import * as placedBuildingTileTypeSchema from "./sql/placedBuildingTileType/schema.js";

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
      ...placedBuildingTileTypeSchema,
      ...buildingTileTypeSchema,
    },
  });
}

type TDB = ReturnType<typeof connectDB>;

export { connectDB, generateID, TDB };
