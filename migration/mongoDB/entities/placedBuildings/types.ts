import { IJob } from "../jobs/types";
import { MongoTileType } from "../tileTypes/types";

export interface IPlacedBuilding {
  _id: string;
  building_id: string;
  used_tiles: Pick<MongoTileType, "_id" | "name" | "quantity">[];
  jobs: Pick<IJob, "_id" | "name" | "type" | "income">[];
}
