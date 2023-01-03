import Candidate from "../model/candidates.js";

export const applyCandidate = async (req, res) => {
  try {
    const newCandidate = await Candidate.create(req.body);
    res
      .status(200)
      .json({ message: "Success Fully applied", data: newCandidate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCandidate = async (req, res) => {
  console.log(req.params.id);
  try {
    const candidate = await Candidate.findById(req.params.id);
    res.status(200).json(candidate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editCandite = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Candidate updated successfully", data: candidate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted candidate" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const searchCndidate = async (req, res) => {
  try {
    const candidate = await Candidate.find({
      $or: [{ name: { $regex: req.query?.q?.trim() } }],
    });
    res.status(200).json(candidate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCandidatesByDepartment = async (req, res) => {
  try {
    const candidates = await Candidate.find({
      job: { $regex: req.query?.q?.trim() },
    });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
