/**
 * Neo4j Migration Transformer
 * Converts PostgreSQL data to Neo4j graph structure
 */

import { PostgresData } from "../postgresql/fetchPostgresData.js";

export interface GraphMutations {
  createUser: UserCreate[];
  createCity: CityCreate[];
  createRegion: RegionCreate[];
  createBuilding: BuildingCreate[];
  createResource: ResourceCreate[];
  createTileType: TileTypeCreate[];
  createTile: TileCreate[];
  createPlacedBuilding: PlacedBuildingCreate[];
  createInventory: InventoryCreate[];
  createJob: JobCreate[];
  createRelationships: RelationshipCreate[];
}

interface UserCreate {
  id: string;
  username: string;
  password: string;
}

interface CityCreate {
  id: string;
  name: string;
}

interface RegionCreate {
  id: string;
  name: string;
  isUnlocked: boolean;
}

interface BuildingCreate {
  id: string;
  name: string;
  type: string;
  tilesNeeded: number;
  maxPersons: number;
}

interface ResourceCreate {
  id: string;
  name: string;
}

interface TileTypeCreate {
  id: string;
  name: string;
}

interface TileCreate {
  id: string;
}

interface PlacedBuildingCreate {
  id: string;
}

interface InventoryCreate {
  id: string;
}

interface JobCreate {
  id: string;
  name: string;
  type: string;
  income: string;
}

interface RelationshipCreate {
  type: string;
  from: string;
  fromLabel: string;
  to: string;
  toLabel: string;
  relationshipType: string;
}

export function transformSqlToNeo4j(data: PostgresData): GraphMutations {
  const {
    users,
    cities,
    regions,
    buildings,
    resources,
    tileTypes,
    tiles,
    placedBuildings,
    inventories,
    jobs,
    inventoryResources,
    buildingTileTypes,
    buildingResourceCosts,
    regionResourceCosts,
    placedBuildingTileTypes,
  } = data;

  const relationships: RelationshipCreate[] = [];

  // Create Users
  const createUser = users.map((u) => ({
    id: u.id,
    username: u.username,
    password: u.password,
  }));

  // Create Cities and User->City relationships
  const createCity = cities.map((c) => {
    // Add User --OWNS--> City relationship
    relationships.push({
      type: "OWNS",
      from: c.userID,
      fromLabel: "User",
      to: c.id,
      toLabel: "City",
      relationshipType: "OWNS",
    });

    return {
      id: c.id,
      name: c.name,
    };
  });

  // Create Resources
  const createResource = resources.map((r) => ({
    id: r.id,
    name: r.name,
  }));

  // Create TileTypes
  const createTileType = tileTypes.map((tt) => ({
    id: tt.id,
    name: tt.name ?? "",
  }));

  // Create Tiles and Region->Tile relationships
  const createTile = tiles.map((t) => {
    relationships.push({
      type: "HAS",
      from: t.regionID,
      fromLabel: "Region",
      to: t.id,
      toLabel: "Tile",
      relationshipType: "HAS",
    });

    relationships.push({
      type: "HAS",
      from: t.id,
      fromLabel: "Tile",
      to: t.tileTypeID,
      toLabel: "TileType",
      relationshipType: "HAS",
    });

    return {
      id: t.id,
    };
  });

  // Create Regions and Map->Region relationships
  const createRegion = regions.map((r) => {
    // Find city that owns this region's map
    const regionMap = data.maps.find((m) => m.id === r.mapID);
    const regionCity = cities.find((c) => c.mapID === r.mapID);

    if (regionCity) {
      relationships.push({
        type: "HAS",
        from: regionCity.id,
        fromLabel: "City",
        to: r.id,
        toLabel: "Region",
        relationshipType: "HAS",
      });
    }

    // Add Region costs relationships
    const regionCosts = regionResourceCosts.filter((rc) => rc.regionID === r.id);
    regionCosts.forEach((rc) => {
      relationships.push({
        type: "COSTS",
        from: r.id,
        fromLabel: "Region",
        to: rc.resourceID,
        toLabel: "Resource",
        relationshipType: "COSTS",
      });
    });

    return {
      id: r.id,
      name: r.name,
      isUnlocked: r.isUnlocked,
    };
  });

  // Create Buildings and relationships
  const createBuilding = buildings.map((b) => {
    // Building --COSTS--> Resource
    const buildingCosts = buildingResourceCosts.filter((bc) => bc.buildingID === b.id);
    buildingCosts.forEach((bc) => {
      relationships.push({
        type: "COSTS",
        from: b.id,
        fromLabel: "Building",
        to: bc.resourceID,
        toLabel: "Resource",
        relationshipType: "COSTS",
      });
    });

    // Building --BUILDABLE_ON--> TileType
    const buildingTiles = buildingTileTypes.filter((bt) => bt.buildingID === b.id);
    buildingTiles.forEach((bt) => {
      relationships.push({
        type: "BUILDABLE_ON",
        from: b.id,
        fromLabel: "Building",
        to: bt.tileTypeID,
        toLabel: "TileType",
        relationshipType: "BUILDABLE_ON",
      });
    });

    return {
      id: b.id,
      name: b.name,
      type: b.buildingType,
      tilesNeeded: b.tilesUsed,
      maxPersons: b.maxEntities,
    };
  });

  // Create PlacedBuildings and relationships
  const createPlacedBuilding = placedBuildings.map((pb) => {
    // PlacedBuilding --LOCATED_IN--> Region
    relationships.push({
      type: "LOCATED_IN",
      from: pb.id,
      fromLabel: "PlacedBuilding",
      to: pb.regionID,
      toLabel: "Region",
      relationshipType: "LOCATED_IN",
    });

    // PlacedBuilding --OCCUPIES--> Tile
    const pbTiles = placedBuildingTileTypes.filter((pbt) => pbt.placedBuildingID === pb.id);
    pbTiles.forEach((pbt) => {
      relationships.push({
        type: "OCCUPIES",
        from: pb.id,
        fromLabel: "PlacedBuilding",
        to: pbt.tileTypeID, // This might need adjustment based on actual tile ID
        toLabel: "Tile",
        relationshipType: "OCCUPIES",
      });
    });

    return {
      id: pb.id,
    };
  });

  // Create Inventories and relationships
  const createInventory = inventories.map((inv) => {
    // City --HAS--> Inventory
    relationships.push({
      type: "HAS",
      from: inv.cityID,
      fromLabel: "City",
      to: inv.id,
      toLabel: "Inventory",
      relationshipType: "HAS",
    });

    // Inventory --CONTAINS--> Resource
    const invResources = inventoryResources.filter((ir) => ir.inventoryID === inv.id);
    invResources.forEach((ir) => {
      relationships.push({
        type: "CONTAINS",
        from: inv.id,
        fromLabel: "Inventory",
        to: ir.resourceID,
        toLabel: "Resource",
        relationshipType: "CONTAINS",
      });
    });

    return {
      id: inv.id,
    };
  });

  // Create Jobs and relationships
  const createJob = jobs.map((j) => {
    // Job --ASSIGNED_TO--> PlacedBuilding
    relationships.push({
      type: "ASSIGNED_TO",
      from: j.id,
      fromLabel: "Job",
      to: j.placedBuildingID,
      toLabel: "PlacedBuilding",
      relationshipType: "ASSIGNED_TO",
    });

    return {
      id: j.id,
      name: j.name,
      type: j.type,
      income: String(j.income ?? ""),
    };
  });

  return {
    createUser,
    createCity,
    createRegion,
    createBuilding,
    createResource,
    createTileType,
    createTile,
    createPlacedBuilding,
    createInventory,
    createJob,
    createRelationships: relationships,
  };
}
