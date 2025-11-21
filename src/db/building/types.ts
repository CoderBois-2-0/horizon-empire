import { buildingTable } from "./schema";

type IBuilding = typeof buildingTable.$inferSelect;

type IBuildingQuery = Partial<{
  id: string;
}>;

export { IBuilding, IBuildingQuery };
