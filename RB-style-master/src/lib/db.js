import mongoose from "mongoose";

const cached = globalThis._mongooseCache || { conn: null, promise: null };
globalThis._mongooseCache = cached;

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not set, returning null");
    return null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500,
      bufferCommands: false,
    }).then((m) => {
      console.log("MongoDB Connected");
      return m;
    }).catch((err) => {
      console.error("MongoDB Error:", err.message);
      cached.promise = null;
      return null;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
