import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    sku: {
      type: String,
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    attributes: [
      {
        color: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Attribute",
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Attribute",
        },
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    available: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
