import { model, Mongoose } from "mongoose";
import { userSchema } from "./schema";
import { TUser } from "./types";
import { getConn } from "$db/document/index";

class UserDocumentHandler {
  #conn: Promise<Mongoose>;
  #model = model("User", userSchema);

  constructor() {
    this.#conn = getConn();
  }

  async create(newUser: TUser) {
    const user = new this.#model(newUser);

    await this.#conn;
    await user.save();

    return user;
  }

  async findByCredentials(
    username: TUser["username"],
    password: TUser["password"],
  ) {
    const query = this.#model.where({ username, password });

    await this.#conn;
    return query.findOne();
  }
}

export default UserDocumentHandler;
