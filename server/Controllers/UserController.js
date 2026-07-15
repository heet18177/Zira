import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mailer from "../Services/mail.js";

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite : 'none',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    await mailer(email, "Welcome to Zeera Insights", createUser.name);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: createUser,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite : 'none',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current user
const getCurrentUser = async(req , res)=>{
  try {
    const user = await User.findById(req.user);
    if (!user){
      return res.status(404).json({
        success : false,
        message : "User not found"
      })
    }
    return res.status(200).json({
      success : true,
      user
    })
    
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

export { register, login, logout, getAllUsers , getCurrentUser };


