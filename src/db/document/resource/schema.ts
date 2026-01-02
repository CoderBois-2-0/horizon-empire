import { Schema } from "mongoose";

const resourceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export { resourceSchema };
