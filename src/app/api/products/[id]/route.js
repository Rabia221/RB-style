import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";

const fallbackProducts = () => {
  const filePath = path.join(process.cwd(), "src", "lib", "products.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const db = await connectDB();
    if (!db) {
      const products = fallbackProducts();
      const product = products.find((p) => p._id === id);
      if (!product) {
        return Response.json({ message: "Not found" }, { status: 404 });
      }
      return Response.json(product);
    }
    const product = await Product.findById(id);
    if (!product) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }
    return Response.json(product);
  } catch (error) {
    console.error("GET Product Error:", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(product);
  } catch (error) {
    console.error("PUT Product Error:", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Product Error:", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
