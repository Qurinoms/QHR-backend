import Attendance from "../model/attendance.js";
import Employee from "../model/employee.js";
import moment from "moment";

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
  const today = moment().startOf("day");
  try {
    // console.log(today);
    // console.log(moment(today).endOf("day"));
    const data = await Attendance.find({
      date: {
        $gte: today,
        $lte: moment(today).endOf("day"),
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAttendanceByTwoDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const start = moment(startDate).startOf("day");
    const end = moment(endDate).endOf("day");
    console.log(start);
    console.log(end);
    const data = await Attendance.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const getEmployeeAttendancesByMonths = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const start = moment(startDate).startOf("day");
    const end = moment(endDate).endOf("day");
    // console.log(start);
    // console.log(end);
    const data = await Attendance.find({
      date: {
        $gte: start,
        $lte: end,
      },
      user: req.body.userId,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
