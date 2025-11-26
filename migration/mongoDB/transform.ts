import { MongoBuilding } from "./entities/buildings/types";
import { MongoPerson } from "./entities/persons/types";
import { MongoRegion } from "./entities/regions/types";
import { MongoResource } from "./entities/resources/types";
import { MongoTileType } from "./entities/tileTypes/types";
import { MongoUser } from "./entities/users/types";

import { cityRelations } from "$db/city/relations.js";
import { inventoryRelations } from "$db/inventory/relations.js";

import type { PostgresData } from "../postgresql/fetchPostgresData.js";
import { ICity } from "./entities/cities/types";
import { IJob } from "./entities/jobs/types";

export function transformToMongo(sqlData: PostgresData) {
  const {
    users,
    cities,
    regions,
    buildings,
    tileTypes,
    resources,
    persons,
    jobs,
    inventoryResources,
    placedBuildings,
    placedBuildingTileTypes,
    buildingTileTypes,
  } = sqlData;

  type CityWithMap = PostgresData["cities"][number] & {
    map?: { size: string; type: string } | null;
  };

  type InventoryResourceWithRelations =
    PostgresData["inventoryResources"][number] & {
      inventory?: { cityID: string } | null;
      resource?: { name: string } | null;
    };

  // ----------------------------------------------------------
  // RESOURCES
  // ----------------------------------------------------------
  const mongoResources: MongoResource[] = resources.map((r) => ({
    _id: r.id,
    name: r.name,
  }));

  // ----------------------------------------------------------
  // TILE TYPES
  // ----------------------------------------------------------
  const mongoTileTypes: MongoTileType[] = tileTypes.map((t) => ({
    _id: t.id,
    name: t.name ?? "",
  }));

  // ----------------------------------------------------------
  // BUILDINGS
  // ----------------------------------------------------------
  const mongoBuildings: MongoBuilding[] = buildings.map((b) => {
    const buildOn: Pick<MongoTileType, "_id" | "name">[] = buildingTileTypes
      .filter((bt) => bt.buildingID === b.id)
      .map((bt) => ({
        _id: bt.tileTypeID,
        name: (bt as any).tileType.name,
      }));

    return {
      _id: b.id,
      name: b.name,
      type: b.buildingType,
      tiles_needed: b.tilesUsed,
      max_persons: b.maxEntities,
      build_on_tile_types: buildOn,
    };
  });

  // ----------------------------------------------------------
  // USERS → Cities → Inventory
  // ----------------------------------------------------------
  const mongoUsers: MongoUser[] = users.map((u) => {
    const userCities: ICity[] = cities
      .filter((c) => c.userID === u.id)
      .map((c) => ({
        _id: c.id,
        name: c.name,
        map: {
          size: (c as any).map.size,
          type: (c as any).map.type,
        },
        inventory: inventoryResources
          .filter((ir) => (ir as any).inventory.cityID === c.id)
          .map((ir) => ({
            _id: ir.resourceID,
            name: (ir as any).resourceID.name,
            quantity: ir.quantity,
          })),
      }));

    return {
      _id: u.id,
      username: u.username,
      password: u.password,
      cities: userCities,
    };
  });

  // ----------------------------------------------------------
  // REGIONS → Tiles → Placed Buildings → Jobs
  // ----------------------------------------------------------
  const mongoRegions = (sqlData: PostgresData): MongoRegion[] => {
    const {
      regions,
      tiles,
      placedBuildings,
      placedBuildingTileTypes,
      jobs,
      tileTypes,
    } = sqlData;

    return regions.map((r) => {
      // Tiles in this region
      const tilesForRegion = tiles
        .filter((t) => t.regionID === r.id)
        .map((t) => {
          const tileTypeName =
            tileTypes.find((tt) => tt.id === t.tileTypeID)?.name ?? "Unknown";
          return {
            type: tileTypeName,
            quantity: (t as any).quantity ?? 0,
          };
        });

      // Placed buildings in this region
      const placedInRegion = placedBuildings
        .filter((pb) => pb.regionID === r.id)
        .map((pb) => {
          // Tiles used by this placed building
          const usedTiles: Pick<MongoTileType, "_id" | "name" | "quantity">[] =
            placedBuildingTileTypes
              .filter((pt) => pt.placedBuildingID === pb.id)
              .map((pt) => {
                const tileTypeName =
                  tileTypes.find((tt) => tt.id === pt.tileTypeID)?.name ??
                  "Unknown";
                return {
                  _id: pt.tileTypeID,
                  name: tileTypeName,
                  quantity: pt.quantity,
                };
              });

          // Jobs assigned to this placed building
          const jobsForPB: Pick<IJob, "_id" | "name" | "type" | "income">[] =
            jobs
              .filter((j) => j.placedBuildingID === pb.id)
              .map((j) => ({
                _id: j.id,
                name: j.name,
                type: j.type,
                income: j.income,
              }));

          return {
            _id: pb.id,
            building_id: pb.buildingID,
            used_tiles: usedTiles,
            jobs: jobsForPB,
          };
        });

      return {
        _id: r.id,
        name: r.name,
        city_id: (r as any).city_id ?? (r as any).mapID, // adjust if you have map→city mapping
        isUnlocked: r.isUnlocked,
        tiles: tilesForRegion,
        placedBuilding: placedInRegion,
      };
    });
  };

  const mongoRegions2: MongoRegion[] = regions.map((r) => {
    // region tiles
    const tilesForRegion = sqlData.tiles
      .filter((t) => t.regionID === r.id)
      .map((t) => ({
        type: (t as any).tileType?.name ?? null,
        quantity: (t as any).quantity ?? 0,
      }));

    // placed buildings inside region
    const placedInRegion = placedBuildings
      .filter((pb) => pb.regionID === r.id)
      .map((pb) => {
        const usedTiles = placedBuildingTileTypes
          .filter((pt) => pt.placedBuildingID === pb.id)
          .map((pt) => ({
            tile_type_id: pt.tileTypeID,
            tile_type: (pt as any).tileType?.name ?? null,
            quantity: pt.quantity,
          }));

        const jobsForPB = jobs
          .filter((j) => j.placedBuildingID === pb.id)
          .map((j) => ({
            _id: j.id,
            name: j.name,
            type: j.type,
            income: j.income,
          }));

        return {
          _id: pb.id,
          building_id: pb.buildingID,
          used_tiles: usedTiles,
          jobs: jobsForPB,
        };
      });

    return {
      _id: r.id,
      name: r.name,
      city_id: r.city_id,
      isUnlocked: r.isUnlocked,
      tiles: tilesForRegion,
      placedBuilding: placedInRegion,
    };
  });

  // ----------------------------------------------------------
  // PERSONS → Optional Job
  // ----------------------------------------------------------
  const mongoPersons = persons.map((p) => {
    const job = jobs.find((j) => j.personID === p.id);
    let jobObj = undefined;

    if (job) {
      jobObj = {
        job_id: job.id,
        job_name: job.name,
        placedBuilding_id: job.placedBuildingID,
      };
    }

    return {
      _id: p.id,
      name: p.name,
      city_id: (p as any).city_id,
      job: jobObj,
    };
  });

  // ----------------------------------------------------------
  // RETURN Mongo Data
  // ----------------------------------------------------------
  return {
    resources: mongoResources,
    users: mongoUsers,
    regions: mongoRegions,
    buildings: mongoBuildings,
    tileTypes: mongoTileTypes,
    persons: mongoPersons,
  };
}
