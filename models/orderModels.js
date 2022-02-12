import mongoose from "mongoose";

const orderModel = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: Number,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
    shipped: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);
const Order = mongoose.model("Order", orderModel);
export default Order;
