import { InferSchemaType } from "mongoose";
import { citySchema, userSchema } from "./schema";

type TDocumentUser = Omit<InferSchemaType<typeof userSchema>, "cities">;
type TDocumentCity = InferSchemaType<typeof citySchema>;

export { TDocumentUser, TDocumentCity };
