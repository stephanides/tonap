"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Product {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.length = data.length;
        this.wide = data.wide;
        this.depth = data.depth;
        this.weight = data.weight;
    }
}
exports.Product = Product;
const ProductSchema = new mongoose_1.Schema({
    dateCreated: {
        default: Date.now(),
        type: Date,
    },
    depth: Number,
    description: String,
    length: Number,
    title: {
        required: true,
        type: String,
        unique: true,
    },
    wide: Number,
    wight: Number,
});
exports.Products = mongoose_1.model("Product", ProductSchema);
