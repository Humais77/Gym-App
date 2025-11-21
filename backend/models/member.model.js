const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        enum:['male','female','other'],
    },
    membershipPlan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
    },
    joiningDate:{
        type:Date,
        default:Date.now,
    },
    endDate:{
        type:Date,
        default:null,
    },
    status:{
        type:String,
        enum:["active","expired","paused"],
        default:"active",
    },
    profilePicture:{
        type:String,
        default:"",
    },

},{timestamps:true});

memberSchema.pre("save", function (next) {
    if (this.endDate && this.endDate < new Date()) {
        this.status = "expired";
    }
    next();
});


const Member = mongoose.model("Member",memberSchema);
module.exports = Member;