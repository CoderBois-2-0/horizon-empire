import { MongoTileType } from "../tileTypes/types";

export interface MongoBuilding {
  _id: string;
  name: string;
  type: string;
  tiles_needed: number;
  max_persons: number;
  build_on_tile_types: Pick<MongoTileType, "_id" | "name">[];
}
