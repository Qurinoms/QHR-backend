import Attendance from "../model/attendance.js";
import Employee from "../model/employee.js";
import moment from "moment";
const today = moment().startOf("day");

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
  try {
    const userId = req.body.userId;
    const data = await Attendance.find({
      user: userId,
    }).sort({ updatedAt: "desc" });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAllTodayAttendance = async (req, res) => {
  try {
    // console.log(today);

    const data = await Attendance.find({
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
