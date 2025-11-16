const bcrypt = require('bcryptjs');
const User = require('../../models/user.model.js');
const { errorHandler } = require('../../utils/errorHandler.js');

// Admin: Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

// Admin: Create a new user
const createUser = async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(409, "User with this email already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        next(error);
    }
};

// Admin: Update User
const updateUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
        }
        const updatedUser = await user.save();
        res.json({message:"User update successfully",user:updatedUser});
    } catch (error) {
        return next(errorHandler(500,"Server error"));
    }
}

// Admin: Delete User
const deleteUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:"User delete successfully"});
        }else{
            return next(errorHandler(400,"User not found"));
        }
    } catch (error) {
        return next(errorHandler(500,"Server error"));
    }
}

module.exports = { getUsers,  createUser, updateUser ,deleteUser};
