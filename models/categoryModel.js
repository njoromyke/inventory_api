import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
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
    },
  },
  {
    timeStamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
