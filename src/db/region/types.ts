import { regionsTable } from "./schema";

export type IRegion = typeof regionsTable.$inferSelect;

export interface IRegionQuery {
  mapID?: string;
}
