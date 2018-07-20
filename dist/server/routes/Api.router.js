"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Product_controller_1 = require("../controllers/Product.controller");
const CheckToken_helper_1 = require("./helpers/CheckToken.helper");
const router = express.Router();
const product = new Product_controller_1.default();
router.post("/product/store", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        product.store(req, res, next);
    });
});
exports.default = router;
