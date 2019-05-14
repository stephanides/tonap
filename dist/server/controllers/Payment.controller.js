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
const crypto = require("crypto");
const Order_model_1 = require("../models/Order.model");
class PaymentController {
    manage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('CardPay');
                console.log(req.body);
                const lastOrderNum = yield this.findLastOrderNum();
                const orderNum = lastOrderNum ?
                    new Date().getFullYear() + ((lastOrderNum + 1) > 99 ? String(lastOrderNum + 1) : ((lastOrderNum + 1) > 9 ? "0" + (lastOrderNum + 1) : "00" + (lastOrderNum + 1))) : new Date().getFullYear() + "001";
                const AMT = String(0.01); // req.body.fullPrice;
                const CURR = '978';
                const IPC = String(req.connection.remoteAddress);
                const KEY = '7248666c5a6b4f3753526179624a7a7649687342525453536f34662d7442614e597938384964744a30527a4e574f6e794e4c73715f526d6c6a6b343131554778';
                const KS = '0308';
                const MID = '7279';
                const NAME = `${req.body.name}%20${req.body.surname}`;
                const RURL = 'https://moja.tatrabanka.sk/cgi-bin/e-commerce/start/example.jsp';
                const TIMESTAMP = this.calculateTimeStamp();
                const VS = orderNum;
                const HMAC_STRING = MID + AMT + CURR + VS + RURL + TIMESTAMP;
                console.log(HMAC_STRING);
                const HMAC = this.hash_hmac(HMAC_STRING, KEY);
                const url = `https://moja.tatrabanka.sk/cgi-bin/e-commerce/start/example.jsp?MID=${MID}&AMT=${AMT}&CURR=${CURR}&VS=${VS}&RURL=${RURL}&IPC=${IPC}&NAME=${NAME}&TIMESTAMP=${TIMESTAMP}&HMAC=${HMAC}`;
                console.log(KEY.length);
                console.log(Buffer.from(KEY));
                console.log(HMAC);
                res.json({ message: 'CardPay', url, success: true });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    calculateTimeStamp() {
        const date = new Date();
        const DD = date.getDate();
        const MM = date.getMonth() + 1;
        const YYYY = date.getFullYear();
        const HH = date.getHours();
        const MI = date.getMinutes();
        const SS = date.getSeconds();
        const timestamp = `${DD < 10 ? '0' + DD : DD}${MM < 10 ? '0' + MM : MM}${YYYY}${HH < 10 ? '0' + HH : HH}${MI < 10 ? '0' + MI : MI}${SS < 10 ? '0' + SS : SS}`;
        return timestamp;
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
    hash_hmac(string, key) {
        const hmac = crypto.createHmac('SHA256', Buffer.from(key, 'hex')); // key.length === 128 ? Buffer.from(key, 'hex') : Buffer.from(key, 'ascii')
        hmac.update(string);
        return hmac.digest('hex');
    }
}
exports.default = PaymentController;
