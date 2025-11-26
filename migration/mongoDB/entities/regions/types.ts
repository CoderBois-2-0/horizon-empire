import { IJob } from "../jobs/types";
import { MongoTileType } from "../tileTypes/types";

export interface MongoRegion {
  _id: string;
  name: string;
  city_id: string;
  isUnlocked: boolean;
  tiles: { type: string; quantity: number }[];
  placedBuilding: {
    _id: string;
    building_id: string;
    used_tiles: Pick<MongoTileType, "_id" | "name" | "quantity">[];
    jobs: Pick<IJob, "_id" | "name" | "type" | "income">[];
  }[];
}
