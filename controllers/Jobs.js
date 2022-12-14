import Job from "../model/jobs.js";

export const postJobs = async (req, res) => {
  try {
    const { jobTitle, department } = req.body;
    const newJobs = await Job.create({
      ...req.body,
      jobTitle: jobTitle.toLowerCase(),
      department: department.toUpperCase(),
    });
    res.status(200).json(newJobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const editJobs = async (req, res) => {
  try {
    const editedJob = await Job.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(editedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteJobs = async (req, res) => {
  try {
    await Job.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getJob = async (req, res) => {
  try {
    const getJob = await Job.findById(req.params.id);
    res.status(200).json(getJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchJobs = async (req, res) => {
  const jobs = await Job.find({
    $or: [
      { jobTitle: { $regex: req.query?.q?.toLowerCase()?.trim() } },
      { department: { $regex: req.query?.q?.toUpperCase()?.trim() } },
    ],
  });
  res.status(200).json(jobs);
};
