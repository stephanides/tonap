"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_model_1 = require("../models/Order.model");
class OrderController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield Order_model_1.Orders.findOne({ orderNum: req.body.orderNum });
            if (order) {
                this.throwError("Order allready exist", 409, next);
            }
            else {
                const orderObj = {
                    city: req.body.city,
                    company: req.body.company,
                    email: req.body.email,
                    ico: req.body.ico,
                    name: req.body.name,
                    orderNum: req.body.orderNum,
                    products: req.body.products,
                    street: req.body.street,
                    surname: req.body.surname,
                };
                const productArr = [];
                for (let i = 0; i < req.body.products.length; i++) {
                    // productArr.push(product);
                    console.log(req.body.products[i]);
                }
                orderObj.products = req.body.products; // productArr;
                const newOrder = new Order_model_1.Order(orderObj);
                try {
                    const asyncCreateOrder = yield Order_model_1.Orders.create(newOrder);
                    if (asyncCreateOrder) {
                        res.json({ message: "Order has been created", success: true });
                    }
                    else {
                        this.throwError("Can\"t create order", 500, next);
                    }
                }
                catch (err) {
                    return next(err);
                }
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield Order_model_1.Orders.find({});
            if (!orders || orders.length < 1) {
                this.throwError("Nothing found", 404, next);
            }
            else {
                res.json({ data: orders, success: true });
            }
        });
    }
    throwError(errMessage, errStatus, next) {
        const err = new Error(errMessage);
        err.status = errStatus;
        return next(err);
    }
}
exports.default = OrderController;
