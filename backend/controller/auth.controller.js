const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const {errorHandler} = require('../utils/errorHandler.js');
const signup = async (req,res,next)=>{
    const {username,email,password,confirmPassword} = req.body;
    if(!username && !email && !password){
        next(errorHandler(400,"All field are required"));
    }
    if (password !== confirmPassword){
        return next(errorHandler(400,"Password and Confirm Password do not match"));
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return next(errorHandler(409,"User with this email already exists"));
    }
    if(password.length < 8){
        return next(errorHandler(400,"Password must be at least 8 characters long"));
    }
    const hashedPassword = await bcrypt.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });
    try {
        await newUser.save();
        res.json({message:"User registered successfully"});
    } catch (error) {
        next(error);
    }
}

module.exports = {signup};