"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Order_controller_1 = require("../controllers/Order.controller");
const Product_controller_1 = require("../controllers/Product.controller");
const Sale_controller_1 = require("../controllers/Sale.controller");
const CheckToken_helper_1 = require("./helpers/CheckToken.helper");
const router = express.Router();
const order = new Order_controller_1.default();
const product = new Product_controller_1.default();
const sale = new Sale_controller_1.SaleController();
router.post("/order/state", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        order.handleEmailNotification(req, res, next);
    });
});
router.get("/order", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        order.getAll(req, res, next);
    });
});
router.delete("/product/:id", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        product.delete(req, res, next);
    });
});
router.get("/product", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        product.getAll(req, res, next);
    });
});
router.post("/product", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        product.store(req, res, next);
    });
});
router.put("/product", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        product.update(req, res, next);
    });
});
router.post("/sale", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        sale.create(req, res, next);
    });
});
router.delete("/sale", (req, res, next) => {
    CheckToken_helper_1.checkToken(req, res, next, () => {
        sale.remove(req, res, next);
    });
});
exports.default = router;
