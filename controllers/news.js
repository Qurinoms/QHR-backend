import Employee from "../model/employee.js";
import News from "../model/news.js";

export const createNews = async (req, res) => {
  try {
    const user = await Employee.findById(req.body.postBy);
    if (!user) {
      res.status(404).json({ message: "User not exist please login" });
    }
    const news = new News({ ...req.body, postBy: req.body.postBy });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Delete News" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSingleNews = async (req, res) => {
  try {
    const data = await News.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllNews = async (req, res) => {
  try {
    const data = await News.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
