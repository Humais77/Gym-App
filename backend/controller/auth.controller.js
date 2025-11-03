const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const errorHandler = require('../utils/errorHandler.js');
const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username && !email && !password){
        next(errorHandler(400,"All field are required"));
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