import { Schema } from "mongoose";

const inventorySchema = new Schema({
  resourceID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  resourceName: {
    type: String,
    required: true,
  },
  resourceQuantity: {
    type: Number,
    required: true,
  },
});

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  map: {
    required: true,
    type: new Schema(
      {
        size: {
          required: true,
          type: String,
          enum: ["small", "medium", "large"],
        },
        type: {
          required: true,
          type: String,
          enum: ["forrest", "arctic", "desert", "bay"],
        },
      },
      { _id: false },
    ),
  },
  inventory: {
    required: false,
    type: [inventorySchema],
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cities: {
    type: [citySchema],
  },
});

export { userSchema, citySchema };
