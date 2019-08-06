"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Sale {
    constructor(data) {
        this.saleCode = data.saleCode;
        this.sale = data.sale;
    }
}
exports.Sale = Sale;
const Salechema = new mongoose_1.Schema({
    saleCode: String,
    sale: Number
});
;
exports.Sales = mongoose_1.model("Sale", Salechema);
