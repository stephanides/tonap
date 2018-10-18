"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Order {
    constructor(data) {
        this.city = data.city;
        this.company = data.company;
        this.email = data.email;
        this.ico = data.ico;
        this.name = data.name;
        this.orderNum = data.orderNum;
        // this.surname = data.surname;
        this.street = data.street;
        this.products = data.products;
    }
}
exports.Order = Order;
const OrderSchema = new mongoose_1.Schema({
    city: String,
    company: String,
    dateCreated: {
        default: Date.now(),
        type: Date,
    },
    email: String,
    ico: Number,
    name: String,
    orderNum: Number,
    products: Array,
    state: {
        default: 0,
        type: Number
    },
    street: String,
});
exports.Orders = mongoose_1.model("Order", OrderSchema);
