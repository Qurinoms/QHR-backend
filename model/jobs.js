import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: String,
    department: String,
    empType: String,
    quantity: {
      type: Number,
      default: 1,
    },
    desc: String,
    closingDate: Date,
    skills: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
