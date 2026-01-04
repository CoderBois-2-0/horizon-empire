/**
 * Neo4j OGM Entity Definitions
 * Defines the graph schema with relationships matching your data model
 */

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Map {
  id: string;
  size: string;
  type: string;
}

export interface Region {
  id: string;
  name: string;
  isUnlocked: boolean;
}

export interface Tile {
  id: string;
}

export interface TileType {
  id: string;
  name: string;
}

export interface Building {
  id: string;
  name: string;
  type: string;
  tilesNeeded: number;
  maxPersons: number;
}

export interface PlacedBuilding {
  id: string;
}

export interface Resource {
  id: string;
  name: string;
}

export interface Inventory {
  id: string;
}

export interface Job {
  id: string;
  name: string;
  type: string;
  income: string;
}

export interface Person {
  id: string;
  name: string;
}

// Entity with relationships for OGM
export class UserNode {
  id!: string;
  username!: string;
  password!: string;

  // Relationships
  owns?: CityNode[];
}

export class CityNode {
  id!: string;
  name!: string;

  // Relationships
  ownedBy?: UserNode;
  hasInventory?: InventoryNode[];
  hasMap?: MapNode;
}

export class InventoryNode {
  id!: string;

  // Relationships
  belongsTo?: CityNode;
  contains?: ResourceNode[];
}

export class MapNode {
  id!: string;
  size?: string;
  type?: string;

  // Relationships
  belongsTo?: CityNode;
  hasRegions?: RegionNode[];
}

export class RegionNode {
  id!: string;
  name!: string;
  isUnlocked!: boolean;

  // Relationships
  belongsToMap?: MapNode;
  hasTiles?: TileNode[];
  hasPlacedBuildings?: PlacedBuildingNode[];
  costs?: ResourceNode[];
}

export class TileNode {
  id!: string;

  // Relationships
  belongsToRegion?: RegionNode;
  hasTileType?: TileTypeNode;
  occupiedBy?: PlacedBuildingNode;
}

export class TileTypeNode {
  id!: string;
  name!: string;

  // Relationships
  usedByTiles?: TileNode[];
  buildableOn?: BuildingNode[];
}

export class BuildingNode {
  id!: string;
  name!: string;
  type!: string;
  tilesNeeded!: number;
  maxPersons!: number;

  // Relationships
  costs?: ResourceNode[];
  buildableOn?: TileTypeNode[];
}

export class PlacedBuildingNode {
  id!: string;

  // Relationships
  locatedIn?: RegionNode;
  occupies?: TileNode[];
  hasJobs?: JobNode[];
}

export class ResourceNode {
  id!: string;
  name!: string;

  // Relationships
  usedInInventories?: InventoryNode[];
  costFor?: BuildingNode[];
  costForRegion?: RegionNode[];
}

export class JobNode {
  id!: string;
  name!: string;
  type!: string;
  income!: string;

  // Relationships
  assignedTo?: PlacedBuildingNode;
  assignedPerson?: PersonNode;
}

export class PersonNode {
  id!: string;
  name!: string;

  // Relationships
  hasJob?: JobNode;
}
