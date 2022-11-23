import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department_code: { type: String, required: true },
  numberOfEmployees: {
    type: Number,
    default: false,
  },
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
