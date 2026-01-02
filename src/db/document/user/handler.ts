import { model, Mongoose } from "mongoose";
import { userSchema } from "./schema";
import { TDocumentCity, TDocumentUser } from "./types";
import { getConn } from "$db/document/index";

class UserDocumentHandler {
  #conn: Promise<Mongoose>;
  #model = model("User", userSchema);

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
    await this.#conn;

    const user = await this.#model.findById(userID);
    if (!user) {
      return;
    }

    user.cities.push(newCity);
    await user.save();
  }
}

export default UserDocumentHandler;
