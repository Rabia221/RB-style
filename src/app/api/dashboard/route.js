import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: "Pending" });

  return Response.json({
    totalProducts,
    totalOrders,
    totalUsers,
    pendingOrders,
  });
}
