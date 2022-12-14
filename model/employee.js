import mongoose from "mongoose";
import crypto from "crypto";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    emp_id: {
      // required: [
      //   true,
      //   "You have to provide a unique identifier for  each employee",
      // ],
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter the email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
      minLength: 6,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    designation: {
      // required: true,
      type: String,
    },
    phoneNumber: {
      // required: true,
      type: String,
    },
    bankAccount: {
      type: String,
      // required: [true, "Account Number is required"],
    },
    ifscCode: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    department: String,
    joined: {
      type: Date,
      default: new Date(),
    },
    deficit: {
      type: String,
      default: "00:00",
    },
    projects: {
      type: Array,
      default: [],
    },
    pincode: String,
    age: Number,
    address: String,
    country: String,
    emergencyNumber: String,
    gender: String,
    status: {
      type: String,
      default: "working",
    },
    isVisited: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
    },
    personalEmail: {
      type: String,
    },
    upi: String,
    branchName: String,
    bankName: String,
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

export default mongoose.model("Employee", employeeSchema);
