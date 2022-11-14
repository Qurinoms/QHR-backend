import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: { type: Date, default: new Date() },
  inTime: { type: Date },
  outTime: { type: Date },
  duration: Number,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
