import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

// Signup controller
export const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already registered" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        // Generate token and send response
        createTokenAndSaveCookie(newUser._id, res);
        res.status(201).json({
            message: "User created successfully",
            user: { _id: newUser._id, username: newUser.username, email: newUser.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "User logged in successfully",
            user: { _id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Logout controller
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// All users controller
export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const { page = 1, limit = 10 } = req.query;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } })
            .select("-password")
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in allUsers Controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};