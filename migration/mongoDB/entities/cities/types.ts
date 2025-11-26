import { MongoResource } from "../resources/types";

export interface ICity {
  _id: string;
  name: string;
  map: {
    size: string;
    type: string;
  };
  inventory: Pick<MongoResource, "_id" | "name" | "quantity">[];
}
