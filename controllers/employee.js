import Employee from "../model/employee.js";

export const getEmployeeData = async (req, res) => {
  try {
    const data = await Employee.findById(req.body.userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
