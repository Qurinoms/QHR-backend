import User from "../model/employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/semdEmail.js";
import crypto from "crypto";
// Send Token

export const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashPassword });

    await newUser.save();
    const message = `
    <h1>Hello MR/MIS ${newUser.name} ! Welcome to QHR Attendance Website </h1>
      <p>This is your web mail for QHR ${newUser.email} and Password ${
      req.body.password
    }</p>
      <a href=${"https://qhr.qurinomsolutions.com/login"} clicktracking=off>Click Here to Access</a>
    `;
    await sendMail({
      to: newUser.email,
      subject: "Welcome to QHR",
      text: message,
    });
    res.status(200).json({
      success: true,
      message:
        "User has been created successfully LOGIN TO ACCESS YOUR PORTAL ",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect)
      return res
        .status(401)
        .json({ success: false, message: "Password does not match" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user: others, access_token: token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Forget password

export const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `https://qhr.qurinomsolutions.com/passwordreset/${resetToken}`;

    // HTML Meassage

    const message = `
    <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendMail({
        to: user.email,
        subject: "Password reset",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res
        .status(500)
        .json({ success: false, message: "Email Coult not be sent" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({
      success: true,
      data: "Password Update Success",
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ success: true, data: user._doc });
    } else {
      const newUser = new User({ ...req.body, formGoogle: true });
      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
