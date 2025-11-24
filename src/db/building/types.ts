import { buildingTable } from "./schema";

type IBuilding = typeof buildingTable.$inferSelect;

type IBuildingQuery = Partial<{
}>;

export { IBuilding, IBuildingQuery };
