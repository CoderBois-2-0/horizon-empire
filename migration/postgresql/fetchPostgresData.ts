import { TDB, connectToDB } from "./db.js";

export async function fetchPostgreSQLData() {
  try {
    const db: TDB = connectToDB();
    const data = await getAllData(db);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

async function getAllData(db: TDB) {
  const q = db.query;

  const users = await q.userTable.findMany();

  const buildings = await q.buildingTable.findMany();

  const regions = await q.regionsTable.findMany({
    with: { map: true },
  });

  const cities = await q.cityTable.findMany({
    with: {
      user: true,
      map: true,
      inventory: true,
    },
  });

  const inventories = await q.inventoryTable.findMany({
    with: { city: true },
  });

  const jobs = await q.jobTable.findMany({
    with: { person: true, placedBuilding: true },
  });

  const maps = await q.mapTable.findMany();

  const persons = await q.personTable.findMany();

  const placedBuildings = await q.placedBuildingTable.findMany({
    with: { building: true, city: true, region: true },
  });

  const tileTypes = await q.tileTypeTable.findMany();

  const resources = await q.resourceTable.findMany();

  const tiles = await q.tileTable.findMany({
    with: { tileType: true, region: true },
  });

  // _____ join tables _____

  const buildingTileTypes = await q.buildingTileTypeTable.findMany({
    with: { building: true, tileType: true },
  });

  const buildingResourceCosts = await q.buildingResourceCostTable.findMany({
    with: { building: true, resource: true },
  });

  const auditPlacedBuildings = await q.auditPlacedBuildingTable.findMany({
    with: { user: true, placedBuilding: true },
  });

  const inventoryResources = await q.inventoryResourceTable.findMany({
    with: { resource: true, inventory: true },
  });

  const placedBuildingTileTypes = await q.placedBuildingTileTypeTable.findMany({
    with: { placedBuilding: true, tileType: true },
  });

  const regionResourceCosts = await q.regionResourceCostTable.findMany({
    with: { region: true, resource: true },
  });

  // console.log("users:", users);
  // console.log("cities", cities);
  // console.log("audit placedbuildings", auditPlacedBuildings);

  // console.log(
  //   "logging all: ",
  //   users,
  //   "----",
  //   cities,
  //   "----",
  //   regions,
  //   "----",
  //   buildings,
  //   "----",
  //   maps,
  //   "----",
  //   tileTypes,
  //   "----",
  //   tiles,
  //   "----",
  //   inventories,
  //   "----",
  //   resources,
  //   "----",
  //   placedBuildings,
  //   "----",
  //   persons,
  //   "----",
  //   jobs,
  //   "----",
  //   inventoryResources,
  //   "----",
  //   regionResourceCosts,
  //   "----",
  //   buildingResourceCosts,
  //   "----",
  //   buildingTileTypes,
  //   "----",
  //   auditPlacedBuildings,
  //   "----",
  //   placedBuildingTileTypes
  // );

  return {
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
    persons,
    jobs,
    inventoryResources,
    regionResourceCosts,
    buildingResourceCosts,
    buildingTileTypes,
    auditPlacedBuildings,
    placedBuildingTileTypes,
  };
}

export type PostgresData = Awaited<ReturnType<typeof fetchPostgreSQLData>>;
