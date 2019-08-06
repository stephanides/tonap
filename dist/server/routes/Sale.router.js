"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Sale_controller_1 = require("../controllers/Sale.controller");
const router = express.Router();
const sale = new Sale_controller_1.SaleController();
router.get("/sale", (req, res, next) => {
    sale.getAll(req, res, next);
});
exports.default = router;
