import { buildingTable } from "./schema";

type IBuilding = typeof buildingTable.$inferSelect;

type IBuildingQuery = Partial<{
  id: IBuilding["id"];
}>;

export { IBuilding, IBuildingQuery };
