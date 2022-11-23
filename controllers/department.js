import Department from "../model/department.js";

export const createDepartments = async (req, res) => {
  try {
    const department = await Department.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const updateData = await Department.findByIdAndUpdate(
      req.body.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Data Update Successfully",
      data: updateData,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await Department.findOneAndDelete(req.body.id);
    res
      .status(200)
      .json({ status: "success", message: "Department deleted successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const data = await Department.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
