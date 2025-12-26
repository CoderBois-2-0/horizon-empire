import mongoose from "mongoose";

async function getConn() {
  return mongoose.connect("mongodb://127.0.0.1:27017/test");
}

export { getConn };
