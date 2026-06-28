import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";

const fallbackProducts = () => {
  const filePath = path.join(process.cwd(), "src", "lib", "products.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// GET ALL
export async function GET() {
  const db = await connectDB();
  if (!db) return Response.json(fallbackProducts());

  try {
    const products = await Product.find();
    return Response.json(products);
  } catch {
    return Response.json(fallbackProducts());
  }
}

// CREATE
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const product = await Product.create(body);

    return Response.json(product);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error Occurred" }, { status: 500 });
  }
}