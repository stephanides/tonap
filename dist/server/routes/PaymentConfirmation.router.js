"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const PaymentConfirmation_controller_1 = require("../controllers/PaymentConfirmation.controller");
const router = express.Router();
const paymentConfirmation = new PaymentConfirmation_controller_1.default();
router.get("/potvrdenie-platby", (req, res, next) => {
    paymentConfirmation.manage(req, res, next);
});
exports.default = router;
