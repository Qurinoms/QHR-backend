import Leave from "../model/leave.js";

export const applyLeave = async (req, res) => {
  const { userId, subject, leaveDate, rejoinDate, desc } = req.body;
  try {
    const data = await Leave.create({
      user: userId,
      subject,
      leaveDate,
      rejoinDate,
      desc,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const updateLeave = async (req, res) => {
  try {
    const updatedData = await Leave.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const deleteLeave = async (req, res) => {
  try {
    console.log(req.params.id);
    await Leave.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const getSpecificLeave = async (req, res) => {
  try {
    const data = await Leave.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const getLeveByStatus = async (req, res) => {
  try {
    // console.log(req.params.status);
    const data = await Leave.find({ status: req.params.status });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAllLeave = async (req, res) => {
  try {
    const data = await Leave.find({ user: req.params.userId });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
