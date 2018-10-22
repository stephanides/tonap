"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Order {
    constructor(data) {
        this.city = data.city;
        this.company = data.company;
        this.dateModified = data.dateModified;
        this.deliveryTime = data.deliveryTime;
        this.email = data.email;
        this.ico = data.ico;
        this.message = data.message;
        this.name = data.name;
        this.orderNum = data.orderNum;
        this.state = data.state;
        this.street = data.street;
        this.phone = data.phone;
        this.psc = data.psc;
        this.products = data.products;
    }
}
exports.Order = Order;
const OrderSchema = new mongoose_1.Schema({
    city: String,
    company: String,
    dateModified: Date,
    deliveryTime: {
        default: 0,
        type: Number,
    },
    dateCreated: {
        default: Date.now(),
        type: Date,
    },
    email: String,
    ico: Number,
    message: String,
    name: String,
    orderNum: Number,
    phone: String,
    psc: String,
    products: Array,
    state: {
        default: 0,
        type: Number
    },
    street: String,
});
exports.Orders = mongoose_1.model("Order", OrderSchema);
