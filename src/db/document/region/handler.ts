import { model } from "mongoose";
import { regionSchema } from "./schema";

function getRegionDocumentModel() {
  return model("Region", regionSchema);
}

export { getRegionDocumentModel };
