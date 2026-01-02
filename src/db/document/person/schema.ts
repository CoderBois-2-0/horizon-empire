import { Schema } from "mongoose";

const jobSchema = new Schema({
  jobID: {
    type: Schema.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  buildingName: {
    type: String,
    required: true,
  },
  placedBuildingID: {
    type: Schema.ObjectId,
    required: true,
  },
});

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cityID: {
    type: Schema.ObjectId,
    required: true,
  },
  job: {
    type: jobSchema,
  },
});

export { personSchema };
