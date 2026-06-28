// services/orderService.js
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export const createOrder = async (data) => {
  await connectDB();
  return await Order.create(data);
};

export const getAllOrders = async () => {
  await connectDB();
  return await Order.find()
    .populate("user")
    .populate("products.product");
};

export const getOrderById = async (id) => {
  await connectDB();
  return await Order.findById(id)
    .populate("user")
    .populate("products.product");
};

export const updateOrderStatus = async (id, status) => {
  await connectDB();
  return await Order.findByIdAndUpdate(
    id,
    { orderStatus: status },
    { new: true }
  );
};

export const deleteOrder = async (id) => {
  await connectDB();
  return await Order.findByIdAndDelete(id);
};