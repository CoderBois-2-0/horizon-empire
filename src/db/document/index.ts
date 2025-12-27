import mongoose from "mongoose";

async function getConn(dbURL: string) {
  return mongoose.connect(dbURL, {
    dbName: "horizon-empire",
  });
}

export { getConn };
