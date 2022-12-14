import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,
    email: { type: String, required: true },
    resume: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    source: String,
    status: {
      type: String,
      enum: ["applied", "hired", "rejected", "round1", "round2", "round3"],
      default: "applied",
    },
    job: { type: String, required: true },
    gender: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
