const mongoose = require('mongoose');

const planScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    durationInDays:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        trim:true,
    },
},{timestamps:true});

const Plan = mongoose.model("Plan",planScehma);
module.exports = Plan;