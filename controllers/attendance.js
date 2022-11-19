import Attendance from "../model/attendance.js";
import Employee from "../model/employee.js";
export const attendance = async (req, res) => {
  try {
    const { inTime, outTime, date, userId } = req.body;
    console.log(req.body);

    const data = await Attendance.create({
      user: userId,
      inTime,
      outTime,
      date,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const selfAttendance = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.body.userId;
    const data = await Attendance.find({
      user: userId,
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
