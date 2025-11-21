import { regionsTable } from "./schema";

export type IRegion = typeof regionsTable.$inferSelect;

export interface IRegionQuery {
  name?: string;
  mapID?: string;
  isUnlocked?: boolean;
}
