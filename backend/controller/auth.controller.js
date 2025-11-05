const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user.model.js');
const { errorHandler } = require('../utils/errorHandler.js');

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password) {
        return next(errorHandler(400, "All fields are required"));
    }
    if (!emailRegex.test(email)){
        return next(errorHandler(400, "Invalid email format"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(errorHandler(409, "User with this email already exists"));
    }

   if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
  return next(errorHandler(400, "Password must be at least 8 chars, include 1 uppercase letter and 1 number"));
}

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();

        const payload = { user: { id: newUser._id } };

         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 40 * 60 * 60 * 1000 
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            token, 
        });

    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(errorHandler(401, "Invalid credentials"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(errorHandler(401, "Invalid credentials"));
        }
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '40h' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 40 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        next(error);
    }

}
module.exports = { register, login };
