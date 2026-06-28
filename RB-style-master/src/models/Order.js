import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    products: Array,
    totalPrice: Number,

    status: {
      type: String,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "cod"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    adminMessage: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);