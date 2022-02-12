import mongoose from "mongoose";

const employeeShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    hiringDate: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    role: {
        type: String,
        required: true,
    },
  },
  {
    timeStamps: true,
  }
);
const Employee = mongoose.model("Employee", employeeShema);
export default Employee;
