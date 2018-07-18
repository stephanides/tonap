"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const User_controller_1 = require("../controllers/User.controller");
const CheckToken_helper_1 = require("./helpers/CheckToken.helper");
// import { NextFunction } from "connect";
const router = express.Router();
const user = new User_controller_1.UserController();
/*router.get("/user/users", (req, res, next) => {
  user.getUsers(req, res, next);
})*/
router.post("/user/login", (req, res, next) => {
    user.login(req, res, next);
});
/*router.post("/user/register", (req, res, next) => {
  user.register(req, res, next);
});*/
router.put("/user/user/:id", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        user.updateUser(req, res, next);
    });
});
exports.default = router;
