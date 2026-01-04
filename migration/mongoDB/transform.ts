import mongoose, { InferSchemaType } from "mongoose";
import { PostgresData } from "../postgresql/fetchPostgresData.js";
import { tileSchema } from "../../src/db/document/region/schema.js";
import { resourceSchema } from "../../src/db/document/resource/schema.js";
import { tileTypeSchema } from "../../src/db/document/tileType/schema.js";
// import { personSchema } from "../../src/db/document/person/schema.js";
import { userSchema } from "$db/document/user/schema.js";
import { TDocumentBuilding } from "$db/document/building/types.js";

type TTile = Omit<InferSchemaType<typeof tileSchema>, "tileTypeID"> & {
  tileTypeID?: mongoose.Types.ObjectId;
};

type TDocumentResource = InferSchemaType<typeof resourceSchema>;
type TDocumentTileType = InferSchemaType<typeof tileTypeSchema>;
// type TPerson = InferSchemaType<typeof personSchema>;
type TUser = InferSchemaType<typeof userSchema>;

type TBuildingInsert = Omit<TDocumentBuilding, "buildOnTiles"> & {
  buildOnTiles: TTile[];
};
type TJob = {
  id?: string;
  name: string;
  type: string;
  income: string;
  placedBuildingID?: string;
  personID?: string;
};
type TPlacedBuilding = {
  buildingID: mongoose.Types.ObjectId;
  usedTiles: TTile[];
  jobs: TJob[];
};
type TRegionInsert = {
  name: string;
  cityID: mongoose.Types.ObjectId;
  isUnlocked: boolean;
  tiles: TTile[];
  placedBuildings: TPlacedBuilding[];
};
type TInventory = {
  resourceID: mongoose.Types.ObjectId;
  resourceName: string;
  resourceQuantity: number;
};
type TCity = {
  _id: mongoose.Types.ObjectId;
  name: string;
  map: {
    size: "small" | "medium" | "large";
    type: "forrest" | "arctic" | "desert" | "bay";
  };
  inventory: TInventory[];
};
type TUserInsert = Omit<TUser, "cities"> & { cities: TCity[] };
type TResourceInsert = TDocumentResource & { _id: mongoose.Types.ObjectId };
type TTileTypeInsert = TDocumentTileType & { _id: mongoose.Types.ObjectId };

interface TransformedData {
  users: TUserInsert[];
  buildings: TBuildingInsert[];
  regions: TRegionInsert[];
  resources: TResourceInsert[];
  tileTypes: TTileTypeInsert[];
  // persons: TPerson[];
}

export function transformSqlToMongo(data: PostgresData): TransformedData {
  const {
    users,
    cities,
    regions,
    buildings,
    maps,
    tileTypes,
    tiles,
    inventories,
    resources,
    placedBuildings,

    jobs,
    inventoryResources,
    buildingTileTypes,
    placedBuildingTileTypes,
  } = data;

  // Keep a stable mapping from SQL resource IDs (UUIDs) to Mongo ObjectIds
  const resourceIdMap = new Map<string, mongoose.Types.ObjectId>();
  const getResourceObjectId = (sqlId: string | undefined | null) => {
    const key = sqlId ?? "";
    if (!resourceIdMap.has(key)) {
      resourceIdMap.set(key, new mongoose.Types.ObjectId());
    }
    return resourceIdMap.get(key)!;
  };

  // Keep a stable mapping from SQL tile type IDs (UUIDs) to Mongo ObjectIds
  const tileTypeIdMap = new Map<string, mongoose.Types.ObjectId>();
  const getTileTypeObjectId = (sqlId: string | undefined | null) => {
    const key = sqlId ?? "";
    if (!tileTypeIdMap.has(key)) {
      tileTypeIdMap.set(key, new mongoose.Types.ObjectId());
    }
    return tileTypeIdMap.get(key)!;
  };

  // Keep a stable mapping from SQL building IDs (UUIDs) to Mongo ObjectIds
  const buildingIdMap = new Map<string, mongoose.Types.ObjectId>();
  const getBuildingObjectId = (sqlId: string | undefined | null) => {
    const key = sqlId ?? "";
    if (!buildingIdMap.has(key)) {
      buildingIdMap.set(key, new mongoose.Types.ObjectId());
    }
    return buildingIdMap.get(key)!;
  };

  // Keep a stable mapping from SQL city IDs (UUIDs) to Mongo ObjectIds
  const cityIdMap = new Map<string, mongoose.Types.ObjectId>();
  const getCityObjectId = (sqlId: string | undefined | null) => {
    const key = sqlId ?? "";
    if (!cityIdMap.has(key)) {
      cityIdMap.set(key, new mongoose.Types.ObjectId());
    }
    return cityIdMap.get(key)!;
  };

  // --- Transform Buildings ---
  const transformedBuildings: TBuildingInsert[] = buildings.map((building) => {
    const buildTileTypes = buildingTileTypes.filter(
      (bt) => bt.buildingID === building.id,
    );

    return {
      name: building.name,
      type: building.buildingType,
      tilesNeeded: building.tilesUsed,
      maxPersons: building.maxEntities,
      buildOnTiles: buildTileTypes.map((bt) => {
        const tileType = tileTypes.find((tt) => tt.id === bt.tileTypeID);
        return {
          tileTypeID: bt.tileTypeID
            ? getTileTypeObjectId(bt.tileTypeID)
            : undefined,
          type: tileType?.name as
            | "grass"
            | "rock"
            | "water"
            | "snow"
            | "sand"
            | "farmland",
          quantity: building.tilesUsed ?? 1,
        };
      }),
    };
  });

  // --- Transform Tiles ---
  const transformTiles = (tileList: typeof tiles): TTile[] =>
    tileList.map((tile) => ({
      tileTypeID: getTileTypeObjectId(tile.tileTypeID),
      type: (tileTypes.find((tt) => tt.id === tile.tileTypeID)?.name ||
        "grass") as TTile["type"],
      quantity: 1,
    }));

  // --- Transform Placed Buildings ---
  const transformPlacedBuildings = (
    pbList: typeof placedBuildings,
  ): TPlacedBuilding[] =>
    pbList.map((pb) => {
      const pbTileTypes = placedBuildingTileTypes.filter(
        (pbt) => pbt.placedBuildingID === pb.id,
      );
      const pbJobs: TJob[] = jobs
        .filter((job) => job.placedBuildingID === pb.id)
        .map((job) => ({
          id: job.id,
          name: job.name,
          type: job.type,
          income: String(job.income ?? ""),
          placedBuildingID: job.placedBuildingID,
          personID: job.personID ?? undefined,
        }));

      return {
        buildingID: getBuildingObjectId(pb.buildingID),
        usedTiles: pbTileTypes.map((pbt) => ({
          tileTypeID: getTileTypeObjectId(pbt.tileTypeID),
          type: (tileTypes.find((tt) => tt.id === pbt.tileTypeID)?.name ||
            "grass") as TTile["type"],
          quantity: pbt.quantity,
        })),
        jobs: pbJobs,
      };
    });

  // --- Transform Regions ---
  const transformedRegions: TRegionInsert[] = regions.map((region) => {
    const regionTiles = tiles.filter((tile) => tile.regionID === region.id);
    const regionPlacedBuildings = placedBuildings.filter(
      (pb) => pb.regionID === region.id,
    );
    const regionCity = cities.find((city) => city.mapID === region.mapID);
    return {
      name: region.name,
      cityID: getCityObjectId(regionCity?.id),
      isUnlocked: region.isUnlocked,
      tiles: transformTiles(regionTiles) as TTile[],
      placedBuildings: transformPlacedBuildings(regionPlacedBuildings),
    };
  });

  // --- Transform Users ---
  const transformedUsers: TUserInsert[] = users.map((user) => ({
    username: user.username,
    password: user.password,
    cities: cities
      .filter((city) => city.userID === user.id)
      .map((city) => {
        const cityMap = maps.find((map) => map.id === city.mapID);
        const cityInventories = inventories.filter(
          (inv) => inv.cityID === city.id,
        );
        const cityInventoryItems: TInventory[] = cityInventories.flatMap(
          (inv) => {
            const invResources = inventoryResources.filter(
              (ir) => ir.inventoryID === inv.id,
            );
            return invResources.map((ir) => ({
              resourceID: getResourceObjectId(ir.resourceID ?? ir.resource?.id),
              resourceName:
                resources.find((r) => r.id === ir.resourceID)?.name ??
                ir.resource?.name ??
                "",
              resourceQuantity: ir.quantity ?? 0,
            }));
          },
        );
        return {
          _id: getCityObjectId(city.id),
          name: city.name,
          map: {
            size: (cityMap?.size || "small") as "small" | "medium" | "large",
            type: (cityMap?.type || "forrest") as
              | "forrest"
              | "arctic"
              | "desert"
              | "bay",
          },
          inventory: cityInventoryItems,
        };
      }),
  }));

  //   // --- Transform Persons ---
  //   const transformedPersons: TPerson[] = persons.map((person) => {
  //     const personJob = jobs.find((job) => job.personID === person.id);
  //     const placedBuildingForPerson = placedBuildings.find((pb) => pb.id === personJob?.placedBuildingID);
  //     const cityForPerson = cities.find((c) => c.id === placedBuildingForPerson?.cityID);

  //     return {
  //       name: person.name,
  //       cityID: cityForPerson?.id || "",
  //       job: personJob
  //         ? {
  //             jobID: personJob.id,
  //             name: personJob.name,
  //             buildingName: buildings.find((b) => b.id === personJob.placedBuildingID)?.name || "",
  //             placedBuildingID: personJob.placedBuildingID,
  //           }
  //         : undefined,
  //     };
  //   });

  // --- Transform Resources ---
  const transformedResources: TResourceInsert[] = resources.map((r) => ({
    _id: getResourceObjectId(r.id),
    name: r.name,
  }));

  // --- Transform Tile Types ---
  const transformedTileTypes: TTileTypeInsert[] = tileTypes.map((tt) => ({
    _id: getTileTypeObjectId(tt.id),
    name: tt.name ?? "",
  }));

  // --- Return everything ---
  const result: TransformedData = {
    users: transformedUsers,
    buildings: transformedBuildings,
    regions: transformedRegions,
    resources: transformedResources,
    tileTypes: transformedTileTypes,
    // persons: transformedPersons,
  };

  return result;
}
