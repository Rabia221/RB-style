import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";

const fallbackProducts = () => {
  const filePath = path.join(process.cwd(), "src", "lib", "products.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const getAllProducts = async () => {
  const db = await connectDB();
  if (!db) return fallbackProducts();

  try {
    const products = await Product.find().lean();
    if (!products || products.length === 0) return fallbackProducts();
    return products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString?.() || p.createdAt,
      updatedAt: p.updatedAt?.toISOString?.() || p.updatedAt,
    }));
  } catch (e) {
    return fallbackProducts();
  }
};
