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
const nodemailer = require("nodemailer");
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
                };
                const productArr = [];
                orderObj.products = req.body.products;
                const newOrder = new Order_model_1.Order(orderObj);
                try {
                    const asyncCreateOrder = yield Order_model_1.Orders.create(newOrder);
                    if (asyncCreateOrder) {
                        const mailSubject = "TONAP: Informácia o doručení objednávky";
                        const mailBody = "Dobrý deň pán/pani " + req.body.name + " " + req.body.surname + ",\n\n" +
                            "Ďakujeme za Vašu objednávka u spločnosti Tonap s. r. o." +
                            "vaša objednácka číslo: " + req.body.orderNum + " bola prijatá na spracovanie.\n" +
                            "O ďalšom priebehu objednávky Vás budeme informovať prostredníctvom emailu.\n\n" +
                            "S prianim pekného dňa,\ntím Tonap s. r. o.";
                        this.sendMailNotification(req, next, mailSubject, mailBody, () => {
                            res.json({ message: "Order has been created", success: true });
                        });
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
    handleEmailNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            res.json({ message: JSON.stringify(req.body), success: true });
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
    sendMailNotification(req, next, emailSubject, emailBody, callBack) {
        const mailTransporter = nodemailer.createTransport({
            auth: {
                pass: "codebrothers963",
                user: "info@codebrothers.sk",
            },
            host: "smtp.zoho.eu",
            port: 465,
            secure: true,
        });
        const mailOptions = {
            from: "info@codebrothers.sk",
            subject: emailSubject,
            text: emailBody,
            to: req.body.email,
        };
        mailTransporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                this.throwError(err.message, 500, next);
            }
            else {
                console.log("Message has been sent.");
                if (typeof callBack === "function") {
                    callBack();
                }
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
