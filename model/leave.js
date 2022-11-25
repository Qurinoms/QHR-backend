import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    leaveDate: {
      type: Date,
      required: true,
    },
    rejoinDate: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Leave", leaveSchema);
