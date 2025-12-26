import { model } from "mongoose";
import { userSchema } from "./schema";
import { TUser } from "./types";

class UserHandler {
  #model = model("User", userSchema);

  async create(newUser: TUser) {
    const user = new this.#model(newUser);
    await user.save();
  }

  async findByCredentials(
    username: TUser["username"],
    password: TUser["password"],
  ) {
    return this.#model.findOne({ username, password }).exec();
  }
}

export default UserHandler;
