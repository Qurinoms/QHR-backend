import Employee from "../model/employee.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res) => {
  try {
    const users = await Employee.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send({ sccess: false, message: error.message });
  }
};
// get Single user
export const getSingleUser = async (req, res) => {
  try {
    const user = await Employee.findById(req.params.id);

    const { password, updatedAt, ...other } = user?._doc;

    res.status(200).json(other);
  } catch (error) {
    res.status(404).send({ sccess: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  try {
    const user = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: "Data updated", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "User deleted successfully.", success: true });
  } catch (error) {
    res.status(404).send({ sccess: false, message: error.message });
  }
};
