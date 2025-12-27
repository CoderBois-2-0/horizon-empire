import mongoose from "mongoose";

async function getConn() {
  return mongoose.connect("mongodb://horizon:horizon@127.0.0.1:27017", {
    dbName: "horizon-empire",
  });
}

export { getConn };
