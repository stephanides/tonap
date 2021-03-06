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
const mongoose = require("mongoose");
const fs = require("fs-extra");
const Product_model_1 = require("../models/Product.model");
const path = require("path");
const uniqid = require("uniqid");
class ProductController {
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_model_1.Products.find({
                    _id: mongoose.Types.ObjectId(req.params.id),
                });
                if (!product) {
                    this.throwError('Not found', 404, next);
                }
                else {
                    const folderName = product[0].title.toLowerCase().replace(/\s+/g, '-');
                    fs.exists(__dirname + '/../../public/images/products/' + folderName, () => {
                        fs.remove(__dirname + '/../../public/images/products/' + folderName, () => __awaiter(this, void 0, void 0, function* () {
                            const productToDelete = yield Product_model_1.Products.deleteOne(product[0]);
                            if (productToDelete) {
                                res.json({
                                    message: 'Product has been deleted',
                                    success: true,
                                });
                            }
                            else {
                                this.throwError('Something went wrong, during deleting the product.', 500, next);
                            }
                        }));
                    });
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getActive(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productItems = yield Product_model_1.Products.find({ active: true });
                if (!productItems || productItems.length < 1) {
                    res.status(404).json({ message: 'Not found.', success: false });
                }
                else {
                    res.json({
                        data: productItems,
                        success: true,
                    });
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productItems = yield Product_model_1.Products.find({});
                if (!productItems || productItems.length < 1) {
                    res.status(404).json({ message: 'Not found.', success: false });
                }
                else {
                    res.json({
                        data: productItems,
                        success: true,
                    });
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('In store');
            try {
                const productItem = yield Product_model_1.Products.findOne({
                    title: req.body.title,
                });
                if (productItem) {
                    res
                        .status(409)
                        .json({ message: 'Product allready exist', success: false });
                }
                else {
                    console.log('Product not exist');
                    if (req.body.imageFilesData && req.body.imageFilesData.length > 0) {
                        const folderName = req.body.title
                            .toLowerCase()
                            .replace(/\s+/g, '-');
                        const folderPath = '/../../public/images/products/' + folderName;
                        console.log(folderName);
                        fs.mkdir(path.resolve(__dirname + folderPath), (err) => {
                            if (err) {
                                console.log('Error in mkdir');
                                console.log(err);
                                return next(err);
                            }
                            let jnum = 0;
                            const imgUrlArr = [];
                            for (const imageData of req.body.imageFilesData) {
                                const base64Data = imageData.data.split(';base64,')[1];
                                const uID = uniqid.time();
                                fs.writeFile(__dirname + folderPath + '/' + uID + '.' + imageData.type, base64Data, { encoding: 'base64' }, (fileErr) => {
                                    if (fileErr) {
                                        return next(fileErr);
                                    }
                                    else {
                                        imgUrlArr.push({
                                            url: './assets/images/products/' +
                                                folderName +
                                                '/' +
                                                uID +
                                                '.' +
                                                imageData.type,
                                        });
                                        jnum++;
                                        if (jnum === req.body.imageFilesData.length) {
                                            const newProduct = new Product_model_1.Product({
                                                category: req.body.category,
                                                // depth: req.body.depth,
                                                description: req.body.description,
                                                gauge: req.body.gauge,
                                                height: req.body.height,
                                                imageFilesData: imgUrlArr,
                                                // length: req.body.length,
                                                // notSterile: req.body.notSterile,
                                                // notSterileProductMaxCount: req.body.notSterileProductMaxCount,
                                                // notSterileProductMaxPackageCount: req.body.notSterileProductMaxPackageCount,
                                                // notSterileProductMinCount: req.body.notSterileProductMinCount,
                                                // notSterileProductMinPackageCount: req.body.notSterileProductMinPackageCount,
                                                // sterile: req.body.sterile,
                                                // sterileProductMaxCount: req.body.sterileProductMaxCount,
                                                // sterileProductMaxPackageCount: req.body.sterileProductMaxPackageCount,
                                                // sterileProductMinCount: req.body.sterileProductMinCount,
                                                // sterileProductMinPackageCount: req.body.sterileProductMinPackageCount,
                                                title: req.body.title,
                                                variant: req.body.variant,
                                                // variantPriceMin: req.body.variantPriceMin,
                                                // variantPriceMed: req.body.variantPriceMed,
                                                // variantPriceMax: req.body.variantPriceMax,
                                                volume: req.body.volume,
                                                weight: req.body.weight,
                                            });
                                            // newProduct.variant = req.body.variant;
                                            const asyncCreate = (product) => __awaiter(this, void 0, void 0, function* () {
                                                try {
                                                    const createProduct = yield Product_model_1.Products.create(product);
                                                    console.log(createProduct);
                                                    if (createProduct) {
                                                        res.json({
                                                            message: 'Product has been successfully stored',
                                                            success: true,
                                                        });
                                                    }
                                                    else {
                                                        this.throwError('Can"t create product', 500, next);
                                                    }
                                                }
                                                catch (storingErr) {
                                                    return next(storingErr);
                                                }
                                            });
                                            asyncCreate(newProduct);
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            }
            catch (err) {
                console.log(err);
                return next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productToUpdate = yield Product_model_1.Products.find({
                _id: mongoose.Types.ObjectId(req.body._id),
            });
            if (!productToUpdate) {
                this.throwError('Not found', 404, next);
            }
            else {
                const dataToUpdate = new Product_model_1.Product(req.body);
                const updatedProduct = yield Product_model_1.Products.update({ _id: mongoose.Types.ObjectId(req.body._id) }, dataToUpdate);
                if (updatedProduct) {
                    res.json({
                        message: 'Product has been successfully updated',
                        success: true,
                    });
                }
                else {
                    this.throwError("Can't update claim data", 500, next);
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
exports.default = ProductController;
