import { PostgresData } from "../postgresql/fetchPostgresData";
import { connectToMongoDB } from "./db.js";
import { userSchema } from "../../src/db/document/user/schema.js";
import { buildingSchema } from "../../src/db/document/building/schema.js";
import { regionSchema } from "../../src/db/document/region/schema.js";
import { resourceSchema } from "../../src/db/document/resource/schema.js";
import { tileTypeSchema } from "../../src/db/document/tileType/schema.js";
// import { personSchema } from "../../src/db/document/person/schema.js";
import { model } from "mongoose";
import { transformSqlToMongo } from "./transform.js";

export async function migrateToMongo(data: PostgresData | null) {
  if (!data) {
    console.error("no SQL data fetched, for migration");
    return;
  }

  try {
    await connectToMongoDB();

    // Transform SQL data to MongoDB format (with embedded documents)
    const transformedData = transformSqlToMongo(data);
    console.log("SQL data transformed to MongoDB format");

    // Initialize MongoDB models and clear collections
    const models = await initializeMongoModels();
    if (!models) {
      console.error("Error initializing MongoDB models, exiting...");
      return;
    }

    const {
      userModel,
      buildingModel,
      regionModel,
      resourceModel,
      tileTypeModel,
    } = models;

    // Insert transformed data
    await userModel.insertMany(transformedData.users);
    console.log("Users data copied to MongoDB!");

    await buildingModel.insertMany(transformedData.buildings);
    console.log("Buildings data copied to MongoDB!");

    await regionModel.insertMany(transformedData.regions);
    console.log("Regions data copied to MongoDB!");

    await resourceModel.insertMany(transformedData.resources);
    console.log("Resources data copied to MongoDB!");

    await tileTypeModel.insertMany(transformedData.tileTypes);
    console.log("TileTypes data copied to MongoDB!");

    // await personModel.insertMany(transformedData.persons);
    // console.log("Persons data copied to MongoDB!");

    console.log("Migration to mongoDB completed successfully!");
  } catch (error) {
    console.error("Error during migration to MongoDB:", error);
    throw error;
  }
}

async function initializeMongoModels() {
  try {
    console.log("Initializing MongoDB models...");

    // Create models from schemas
    const userModel = model("User", userSchema);
    await userModel.deleteMany({});

    const buildingModel = model("Building", buildingSchema);
    await buildingModel.deleteMany({});

    const regionModel = model("Region", regionSchema);
    await regionModel.deleteMany({});

    const resourceModel = model("Resource", resourceSchema);
    await resourceModel.deleteMany({});

    const tileTypeModel = model("TileType", tileTypeSchema);
    await tileTypeModel.deleteMany({});

    // const personModel = model("Person", personSchema);
    // await personModel.deleteMany({});

    console.log("MongoDB models initialized and collections cleared!");

    return {
      userModel,
      buildingModel,
      regionModel,
      resourceModel,
      tileTypeModel,
      //   personModel,
    };
  } catch (error) {
    console.error("Error initializing MongoDB models:", error);
    return null;
  }
}
