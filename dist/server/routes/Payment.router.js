"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Payment_controller_1 = require("../controllers/Payment.controller");
const router = express.Router();
const order = new Payment_controller_1.default();
router.post("/payment", (req, res, next) => {
    order.manage(req, res, next);
});
exports.default = router;
