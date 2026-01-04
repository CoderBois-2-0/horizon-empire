import { model } from "mongoose";
import { personSchema } from "./schema";

function getPersonDocumentModel() {
  return model("Person", personSchema);
}

export { getPersonDocumentModel };
