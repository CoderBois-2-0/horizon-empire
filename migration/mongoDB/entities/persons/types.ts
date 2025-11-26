import { ICity } from "../cities/types";
import { IJob } from "../jobs/types";

export interface MongoPerson {
  _id: string;
  name: string;
  city_id: Pick<ICity, "_id">;
  job?: Pick<IJob, "_id" | "name" | "type" | "income" | "placed_building_id">;
}
