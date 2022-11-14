import Attendance from "../model/attendance.js";

export const attendance = async (req, res) => {
  try {
    const user = req.user;
    const newAttendance = await Attendance.create({
      ...req.body,
      user: user._id,
    });

    res.status(200).json(newAttendance);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
