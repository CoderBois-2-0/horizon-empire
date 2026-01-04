import { model, Schema, Mongoose } from "mongoose";
import { getConn, transaction } from "$db/document/index";
import { userSchema } from "./schema";
import { TDocumentCity, TDocumentUser } from "./types";
import { getRegionDocumentModel } from "../region/handler";
import { getPersonDocumentModel } from "../person/handler";

function getUserDocumentModel() {
  return model("User", userSchema);
}

class UserDocumentHandler {
  #conn: Promise<Mongoose>;
  #model = getUserDocumentModel();

  constructor(dbURL: string) {
    this.#conn = getConn(dbURL);
  }

  async create(newUser: TDocumentUser) {
    const user = new this.#model(newUser);

    await this.#conn;
    await user.save();

    return user;
  }

  async findByCredentials(
    username: TDocumentUser["username"],
    password: TDocumentUser["password"],
  ) {
    const query = this.#model.where({ username, password });

    await this.#conn;
    return query.findOne();
  }

  async createCity(userID: string, newCity: TDocumentCity): Promise<void> {
    const conn = await this.#conn;
    transaction(conn, async () => {
      const user = await this.#model.findById(userID);
      if (!user) {
        return { commit: false, reason: "Could not find user" };
      }

      user.cities.push(newCity);
      await user.save();

      return { data: null, commit: true };
    });
  }

  async deleteCity(userID: string, cityID: string): Promise<void> {
    const conn = await this.#conn;
    await transaction(conn, async () => {
      const regionModel = getRegionDocumentModel();
      await regionModel.deleteMany({
        cityID: new Schema.ObjectId(cityID),
      });

      const personModel = getPersonDocumentModel();
      await personModel.deleteMany({
        cityID: new Schema.ObjectId(cityID),
      });

      const user = await this.#model.findById(userID);
      if (!user) {
        return { commit: false, reason: "User not found" };
      }

      user.cities.pull(cityID);

      await user.save();

      return { data: null, commit: true };
    });
  }
}

export default UserDocumentHandler;
export { getUserDocumentModel };
