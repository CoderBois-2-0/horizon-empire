import { Schema } from "mongoose";

const tileTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export { tileTypeSchema };
