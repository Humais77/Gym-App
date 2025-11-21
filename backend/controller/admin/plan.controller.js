const Plan = require("../../models/plan.model.js");
const { errorHandler } = require("../../utils/errorHandler.js");

const createPlan = async (req, res, next) => {
    try {
        const { name, price, durationInDays, description } = req.body;
        if (!name || !price || !durationInDays) {
            return next(errorHandler(400, "All fields are required"));
        }
        const planExists = await Plan.findOne({ name });
        if (planExists) {
            return next(errorHandler(409, "Plan already exists"));
        }
        const plan = await Plan.create({
            name,
            price,
            durationInDays,
            description
        });
        res.status(201).json({ message: "Plan created successfully", plan });
    } catch (error) {
        next(errorHandler(500,error.message));
    }
}
const getPlan = async(req,res,next)=>{
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        next(errorHandler(500,error.message));
    }
}
module.exports = {createPlan,getPlan};