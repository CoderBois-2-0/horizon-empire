import { TMap } from "$db/map/types";
import { TUser } from "$db/user/types";
import { cityTable } from "./schema";

type TCity = typeof cityTable.$inferSelect;

interface ICityInsert {
  mapType: TMap["type"];
  mapSize: TMap["size"];
  userID: TUser["id"];
  cityName: TCity["name"];
}

export { ICityInsert };
