"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Order_controller_1 = require("../controllers/Order.controller");
const router = express.Router();
const order = new Order_controller_1.default();
router.post("/order", (req, res, next) => {
    console.log('IN A ROUTE');
    order.create(req, res, next);
});
exports.default = router;
