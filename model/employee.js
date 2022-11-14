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
      required: [
        true,
        "You have to provide a unique identifier for  each employee",
      ],
      type: String,
      unique: true,
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
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: Number,
    },
    bankAccount: {
      type: String,
      required: [true, "Account Number is required"],
    },
    ifseCode: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    dept_name: String,
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
