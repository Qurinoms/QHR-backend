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
    status: {
      type: String,
      enum: ["published", "closed"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
