import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  mongoose: MongooseCache | undefined;
};

const cache: MongooseCache = globalForMongoose.mongoose ?? { conn: null, promise: null };

export async function connectMongo() {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in the environment");
    }
    cache.promise = mongoose.connect(MONGODB_URI);
  }

  cache.conn = await cache.promise;

  if (process.env.NODE_ENV !== "production") {
    globalForMongoose.mongoose = cache;
  }

  return cache.conn;
}
