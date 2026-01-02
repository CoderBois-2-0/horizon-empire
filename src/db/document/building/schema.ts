import { Schema } from "mongoose";
import { tileSchema } from "../region/schema";

const buildingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["housing", "work", "service", "educational"],
    required: true,
  },
  tilesNeeded: {
    type: Number,
    required: true,
  },
  maxPersons: {
    type: Number,
    required: true,
  },
  buildOnTiles: {
    type: [tileSchema],
  },
});

export { buildingSchema };
