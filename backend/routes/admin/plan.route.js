const express = require("express");
const { protect, admin } = require("../../middleware/auth.middleware");
const { createPlan, getPlan } = require("../../controller/admin/plan.controller");
const route = express.Router();

route.post("/",protect,admin,createPlan);
route.get("/",protect,admin,getPlan);

module.exports = route;