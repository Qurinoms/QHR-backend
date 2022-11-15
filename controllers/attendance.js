import Attendance from "../model/attendance.js";

export const attendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const inTime = new Date(req.body.inTime);
    const outTime = new Date(req.body.outTime);
    const data = await Attendance.create({ user: userId, inTime, outTime });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const selfAttendance = async (req, res) => {
  try {
    const user = req.user;
    const data = await Attendance.find({
      user: user.id,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const teamAttendance = async (req, res) => {
  try {
  } catch (error) {}
};
