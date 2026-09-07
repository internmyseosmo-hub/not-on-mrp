import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  id: { type: String }, // Optional original product ID
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      pincode: { type: String, required: true },
    },
    orderItems: [orderItemSchema],
    paymentMethod: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalSavings: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Processing", // e.g. Processing, Shipped, Delivered, Cancelled
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
