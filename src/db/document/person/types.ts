import { personSchema } from "./schema";
import { InferSchemaType } from "mongoose";

type TDocumentPerson = Omit<InferSchemaType<typeof personSchema>, "persons">;

export { TDocumentPerson };
