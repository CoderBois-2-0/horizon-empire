import { TMap } from "$db/sql/map/types";
import { TUser } from "$db/sql/user/types";
import { cityTable } from "./schema";

type TCity = typeof cityTable.$inferSelect;

interface ICityInsert {
  mapType: TMap["type"];
  mapSize: TMap["size"];
  userID: TUser["id"];
  cityName: TCity["name"];
}

export { ICityInsert };
