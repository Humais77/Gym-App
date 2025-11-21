const express = require("express");
const { protect, admin } = require("../../middleware/auth.middleware");
const { createMember, getMembers, getMemberById, updateMember, deleteMember, pauseMembership, activateMembership, getExpiredMembers } = require("../../controller/admin/member.controller");
const route = express.Router();

route.post("/",protect,admin,createMember);
route.get("/",protect,admin,getMembers);
route.get("/:id",protect,admin,getMemberById);
route.put("/:id",protect,admin,updateMember);
route.delete(":id",protect,admin,deleteMember);

route.put("/:id/pause",protect,admin,pauseMembership);
route.put("/:id/activate",protect,admin,activateMembership);
route.get("/status/expired",protect,admin,getExpiredMembers);


module.exports = route;