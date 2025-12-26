import { InferSchemaType } from "mongoose";
import { userSchema } from "./schema";

type TUser = InferSchemaType<typeof userSchema>;

export { TUser };
