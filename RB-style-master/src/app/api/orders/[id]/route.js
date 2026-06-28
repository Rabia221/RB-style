import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    return Response.json(order);
  } catch (error) {
    return Response.json({ message: "Error updating order" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    await Order.findByIdAndDelete(id);
    return Response.json({ message: "Deleted" });
  } catch (error) {
    return Response.json({ message: "Error deleting order" }, { status: 500 });
  }
}
