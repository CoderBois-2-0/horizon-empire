import mongoose, { Mongoose } from "mongoose";

async function getConn(dbURL: string) {
  return mongoose.connect(dbURL, {
    dbName: "horizon-empire",
  });
}

async function transaction<T>(
  conn: Mongoose,
  fn: () => Promise<
    { data: T; commit: true } | { commit: false; reason: string }
  >,
): Promise<{ data: T } | { err: unknown }> {
  const session = await conn.startSession();

  try {
    session.startTransaction();
    const result = await fn();

    if (result.commit) {
      await session.commitTransaction();
    } else {
      await session.abortTransaction();

      return { err: result.reason };
    }

    return { data: result.data };
  } catch (err) {
    console.error(err);

    return { err };
  } finally {
    await session.endSession();
  }
}

export { getConn, transaction };
