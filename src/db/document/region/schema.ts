import { Schema } from "mongoose";

const tileSchema = new Schema({
  tileTypeID: Schema.ObjectId,
  type: {
    type: String,
    enum: ["grass", "rock", "water", "snow", "sand", "farmland"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const jobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "office",
      "firefighter",
      "medical",
      "enforcement",
      "teacher",
      "service",
      "industrial",
    ],
    required: true,
  },
  income: {
    type: String,
    required: true,
  },
});

const placedBuildingSchema = new Schema({
  buildingID: Schema.ObjectId,
  usedTiles: {
    type: [tileSchema],
  },
  jobs: {
    type: [jobSchema],
  },
});

const regionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cityID: {
    type: Schema.ObjectId,
    required: true,
  },
  isUnlocked: {
    type: Boolean,
    required: true,
  },
  tiles: {
    type: [tileSchema],
  },
  placedBuildings: {
    type: [placedBuildingSchema],
  },
});

export { regionSchema, tileSchema };
