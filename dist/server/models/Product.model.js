"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Product {
    constructor(data) {
        this.boxsize = data.boxsize;
        this.category = data.category;
        this.description = data.description;
        this.imageFilesData = data.imageFilesData;
        this.depth = data.depth;
        this.length = data.length;
        this.package = data.package;
        this.title = data.title;
        this.wide = data.wide;
        this.weight = data.weight;
    }
}
exports.Product = Product;
const ProductSchema = new mongoose_1.Schema({
    active: {
        default: true,
        type: Boolean,
    },
    boxsize: Number,
    category: Number,
    dateCreated: {
        default: Date.now(),
        type: Date,
    },
    depth: Number,
    description: String,
    imageFilesData: Array,
    length: Number,
    package: Number,
    title: {
        required: true,
        type: String,
        unique: true,
    },
    wide: Number,
    wight: Number,
});
exports.Products = mongoose_1.model("Product", ProductSchema);
