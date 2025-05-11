import { user } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ================= user login functio =====================  //

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await user.findOne({ email });

    if (!userData) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const comparePassowrd = await bcrypt.compare(password, userData.password);

    if (comparePassowrd) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV == "production",
        path:'/'
      });

      res.status(200).json({ success: true, message: "User logged in" });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occured during registration" });
  }
};

// =========== uer registration function ===================  //

const userRegister = async (req, res) => {
  const { fname, lname, email, phone, address, city, pin, country, password } =
    req.body;
  if ((!fname, !lname, !email, !phone, !password)) {
    return res.status(200).json({
      success: false,
      message: "Please fill mendatory fields",
    });
  }
  try {
    const checkUser = await user.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "email alrady registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = new user({
      fname,
      lname,
      email,
      phone,
      address,
      city,
      pin,
      country,
      password: hashedPassword,
    });
    await data.save();

    if (data) {
      res.status(201).json({
        success: true,
        message: "Registration successfuly !",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Item not add",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};
export { userLogin, userRegister };
