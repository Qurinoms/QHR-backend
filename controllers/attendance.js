import Attendance from "../model/attendance.js";
import Employee from "../model/employee.js";
export const attendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const inTime = new Date(req.body.inTime);
    const outTime = new Date(req.body.outTime);
    let date = ("0" + inTime.getDate()).slice(-2);
    let hrs1 = inTime.getHours();
    let hrs2 = outTime.getHours();
    let deficit = hrs2 - hrs1;
    await Employee.findByIdAndUpdate(userId, { deficit: `${deficit}hr` });
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
