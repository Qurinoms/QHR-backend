import Attendance from "../model/attendance.js";
import Employee from "../model/employee.js";
import moment from "moment";

export const clockIn = async (req, res) => {
  try {
    const { inTime, date, userId } = req.body;
    console.log(req.body);

    const data = await Attendance.create({
      user: userId,
      inTime,

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
    const user = await Employee.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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

export const clockOut = async (req, res) => {
  console.log(req.body);
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { inTime: req.body.inTime, user: req.body.user },
      { outTime: req.body.outTime },
      { new: true }
    );
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteMany = async (req, res) => {
  try {
    await Attendance.deleteMany({ user: req.params.id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
