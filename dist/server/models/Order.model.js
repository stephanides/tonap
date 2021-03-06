"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Order {
    constructor(data) {
        // this.city = data.city;
        this.billingAddress = data.billingAddress;
        // this.cancellation = data.cancellation;
        this.company = data.company;
        this.dateModified = data.dateModified;
        this.deliveryAddress = data.deliveryAddress;
        this.deliveryTime = data.deliveryTime;
        this.dic = data.dic;
        this.email = data.email;
        this.fullPrice = data.fullPrice;
        this.ico = data.ico;
        this.location = data.location;
        this.message = data.message;
        this.name = data.name;
        this.nettPrice = data.nettPrice;
        this.orderNum = data.orderNum;
        this.paymentMethod = data.paymentMethod;
        this.paymenthPrice = data.paymenthPrice;
        this.state = data.state;
        this.shippingMethod = data.shippingMethod;
        this.shippingPrice = data.shippingPrice;
        this.surname = data.surname;
        // this.street = data.street;
        this.phone = data.phone;
        // this.psc = data.psc;
        this.products = data.products;
        this.sale = data.sale;
    }
}
exports.Order = Order;
const OrderSchema = new mongoose_1.Schema({
    billingAddress: Object,
    // city: String,
    /*cancellation: {
      default: false,
      type: Boolean,
    },*/
    company: String,
    dateModified: Date,
    deliveryAddress: Object,
    deliveryTime: {
        default: 0,
        type: Number,
    },
    dateCreated: {
        default: () => { return new Date(); },
        type: Date,
    },
    dic: Number,
    email: String,
    fullPrice: Number,
    ico: Number,
    location: String,
    message: String,
    name: String,
    nettPrice: Number,
    orderNum: Number,
    paymentMethod: Number,
    paymenthPrice: Number,
    phone: String,
    // psc: String,
    products: Array,
    state: {
        default: 0,
        type: Number
    },
    shippingMethod: Number,
    shippingPrice: Number,
    surname: String,
    // street: String,
    // surname: String,
    sale: Object,
});
exports.Orders = mongoose_1.model("Order", OrderSchema);
