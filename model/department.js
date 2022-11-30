import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department_code: { type: String, required: true, unique: true },
  numberOfEmployees: {
    type: Number,
    default: 0,
  },
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
