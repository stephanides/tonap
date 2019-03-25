"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Product {
    constructor(data) {
        this.active = data.active;
        this.category = data.category;
        this.description = data.description;
        this.height = data.height;
        this.gauge = data.gauge;
        this.imageFilesData = data.imageFilesData;
        // this.depth = data.depth;
        // this.length = data.length;
        // this.notSterile = data.notSterile;
        // this.notSterileProductMinCount = data.notSterileProductMinCount;
        // this.notSterileProductMaxCount = data.notSterileProductMaxCount;
        // this.notSterileProductMinPackageCount = data.notSterileProductMinPackageCount;
        // this.notSterileProductMaxPackageCount = data.notSterileProductMaxPackageCount;
        // this.sterile = data.sterile;
        // this.sterileProductMinCount = data.sterileProductMinCount;
        // this.sterileProductMaxCount = data.sterileProductMaxCount;
        // this.sterileProductMinPackageCount = data.sterileProductMinPackageCount;
        // this.sterileProductMaxPackageCount = data.sterileProductMaxPackageCount;
        this.title = data.title;
        this.variant = data.variant;
        // this.variantPriceMin = data.variantPriceMin;
        // this.variantPriceMed = data.variantPriceMed;
        // this.variantPriceMax = data.variantPriceMax;
        this.volume = data.volume;
        // this.wide = data.wide;
        this.weight = data.weight;
    }
}
exports.Product = Product;
const ProductSchema = new mongoose_1.Schema({
    active: {
        default: true,
        type: Boolean,
    },
    category: Number,
    dateCreated: {
        default: Date.now(),
        type: Date,
    },
    // depth: Number,
    description: String,
    height: String,
    gauge: String,
    imageFilesData: Array,
    // length: String,
    // notSterile: Boolean,
    // notSterileProductMaxCount: Number,
    // notSterileProductMaxPackageCount: Number,
    // notSterileProductMinCount: Number,
    // notSterileProductMinPackageCount: Number,
    // sterile: Boolean,
    // sterileProductMaxCount: Number,
    // sterileProductMaxPackageCount: Number,
    // sterileProductMinCount: Number,
    // sterileProductMinPackageCount: Number,
    title: {
        required: true,
        type: String,
        unique: true,
    },
    variant: Array,
    volume: String,
    weight: String,
});
exports.Products = mongoose_1.model("Product", ProductSchema);
