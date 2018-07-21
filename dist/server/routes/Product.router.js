"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Product_controller_1 = require("../controllers/Product.controller");
const router = express.Router();
const product = new Product_controller_1.default();
router.get("/product/get/list", (req, res, next) => {
    product.get(req, res, next);
});
exports.default = router;
