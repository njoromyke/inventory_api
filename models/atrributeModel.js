import mongoose from "mongoose";

const atrributeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Atrribute = mongoose.model("Atrribute", atrributeSchema);
export default Atrribute;
