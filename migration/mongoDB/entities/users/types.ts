import { MongoResource } from "../resources/types";

export interface MongoUser {
  _id: string;
  username: string;
  password: string;
  cities: {
    _id: string;
    name: string;
    map: {
      size: string;
      type: string;
    };
    inventory: Pick<MongoResource, "_id" | "name" | "quantity">[];
  }[];
}
