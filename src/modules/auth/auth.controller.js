import { User } from "../user/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupAsAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const existingUser = await User.findOne({role:"admin"});
    if (existingUser) {
      return res.status(403).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({
      message: "Admin registered successfully",
      user: safeUser
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role = "viewer" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Invalid input"
      });
    }

    if (role === "admin") {
      return res.status(403).json({
        message: "Cannot signup as admin"
      });
    }

    if (!["viewer", "analyst"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      user: safeUser
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid input"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "User is inactive"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};