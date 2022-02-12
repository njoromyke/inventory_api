import mongoose from "mongoose";

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
