import { InferSchemaType } from "mongoose";
import { buildingSchema } from "./schema";

type TDocumentBuilding = InferSchemaType<typeof buildingSchema>;

export { TDocumentBuilding };
