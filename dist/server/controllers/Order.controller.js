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
            try {
                const lastOrderNum = yield this.findLastOrderNum();
                const orderNum = lastOrderNum ?
                    new Date().getFullYear() + ((lastOrderNum + 1) > 99 ? String(lastOrderNum + 1) : ((lastOrderNum + 1) > 9 ? "0" + (lastOrderNum + 1) : "00" + (lastOrderNum + 1))) : new Date().getFullYear() + "001";
                const orderObj = {
                    city: req.body.city,
                    company: req.body.company,
                    email: req.body.email,
                    ico: req.body.ico,
                    name: req.body.name,
                    orderNum,
                    products: req.body.products,
                    street: req.body.street,
                };
                const productArr = [];
                orderObj.products = req.body.products;
                const newOrder = new Order_model_1.Order(orderObj);
                const asyncCreateOrder = yield Order_model_1.Orders.create(newOrder);
                if (asyncCreateOrder) {
                    const mailSubject = "TONAP: Informácia o doručení objednávky";
                    const mailBody = `Dobrý deň pán/pani ${req.body.name}<br /><br />
        Ďakujeme za Vašu objednávka u spločnosti <strong>Tonap s. r. o.</strong><br /><br />
        Vaša objednácka číslo: <strong><i>${orderNum}</i></strong> bola prijatá na spracovanie.<br />
        O ďalšom priebehu objednávky Vás budeme informovať prostredníctvom emailu.<br /><br />
        S prianim pekného dňa,<br />tím <strong>Tonap s. r. o.</strong>`;
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
    findLastOrderNum() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const orders = yield Order_model_1.Orders.find({});
            if (orders.length > 0) {
                let numbers = [];
                for (let i = 0; i < orders.length; i++) {
                    let num, tempNum2Dig, tempNum3Dig;
                    const numStringToParse = String(orders[i].orderNum);
                    for (let j = 0; j < numStringToParse.length; j++) {
                        if (j === 4 && parseInt(numStringToParse[j]) > 0) {
                            tempNum3Dig = parseInt(numStringToParse[j]);
                            console.log("3digit start num:");
                            console.log(tempNum3Dig);
                        }
                        if (j === 5 && parseInt(numStringToParse[j]) > 0) {
                            tempNum2Dig = parseInt(numStringToParse[j]);
                        }
                    }
                    num = tempNum3Dig ?
                        parseInt(String(tempNum3Dig) + numStringToParse.charAt(5) + numStringToParse.charAt(6)) :
                        (tempNum2Dig ?
                            parseInt(String(tempNum2Dig + numStringToParse.charAt(6))) :
                            parseInt(numStringToParse.charAt(6)));
                    numbers.push(num);
                }
                const orderNum = Math.max.apply(Math, numbers);
                resolve(orderNum);
            }
            else {
                resolve(0);
            }
        }));
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
            html: emailBody,
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
