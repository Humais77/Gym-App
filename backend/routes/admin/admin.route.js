const express = require('express');
const route = express.Router();
const {protect, admin} = require("../../middleware/auth.middleware.js");
const {getUsers,createUser, updateUser, deleteUser} = require('../../controller/admin/user.controller.js');

route.get("/",protect,admin,getUsers);
route.post("/",protect,admin,createUser);
route.put("/:id",protect,admin,updateUser);
route.delete("/:id",protect,admin,deleteUser);


module.exports = route;