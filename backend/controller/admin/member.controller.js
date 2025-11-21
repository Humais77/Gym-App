const Member = require("../../models/member.model.js");
const { errorHandler } = require("../../utils/errorHandler.js");

const createMember = async (req, res, next) => {
    try {
        const { name, email, phone, address, membershipPlan, joiningDate, endDate } = req.body;
        if (!name || !email || !phone || !address) {
            return next(errorHandler(400, "All fields are required"));
        }
        const memberExists = await Member.findOne({ email });
        if (memberExists) {
            return next(errorHandler(409, "Member already exists"));
        }
        const member = new Member({
            name,
            email,
            phone,
            address,
            membershipPlan,
            joiningDate,
            endDate
        });
        const newMember = await member.save();
        res.status(201).json({ message: "Member", member: newMember });
    } catch (error) {
        console.log(error);
        next(errorHandler(500, error.message));
    }
}
const getMembers = async (req, res, next) => {
    try {
        const members = await Member.find().populate("membershipPlan")
        res.status(200).json(members)
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

const getMemberById = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id).populate("membershipPlan");
        if (!member) return next(errorHandler(404, "Member not found"));
        res.json(member);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

const updateMember = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return next(errorHandler(404, "Member not found"));
        Object.assign(member, req.body);
        const updatedMember = await member.save();
        res.json({ message: "Member updated", member: updatedMember });
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
}

const deleteMember = async (req, res, next) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) return next(errorHandler(404, "Member not found"));
        res.json({ message: "Member deleted" });
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
}

const pauseMembership = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return next(errorHandler(404, "Member not found"));

        member.status = "paused";
        await member.save();
        res.json({ message: "Member paused", member });
    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
}

const activateMembership = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return next(errorHandler(404, "Member not found"));

        member.status = "active";
        await member.save();

        res.json({ message: "Membership activated", member });

    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

const getExpiredMembers = async (req, res, next) => {
    try {
        const today = new Date();

        const expired = await Member.find({ endDate: { $lt: today } });

        res.json(expired);

    } catch (error) {
        next(errorHandler(500, "Server Error"));
    }
};

module.exports = { createMember, getMembers, getMemberById, updateMember, deleteMember, pauseMembership, activateMembership, getExpiredMembers };