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
const fs = require("fs");
const Product_model_1 = require("../models/Product.model");
const uniqid = require("uniqid");
class ProductController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productItems = yield Product_model_1.Products.find({ active: true });
                if (!productItems || productItems.length < 1) {
                    res.status(404).json({ message: "Not found.", success: false });
                }
                else {
                    res.json({
                        message: productItems,
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
            try {
                const productItem = yield Product_model_1.Products.findOne({ title: req.body.title });
                if (productItem) {
                    res.status(409).json({ message: "Product allready exist", success: false });
                }
                else {
                    if (req.body.imageFilesData && req.body.imageFilesData.length > 0) {
                        const folderName = req.body.title.toLowerCase().replace("/\s+/g", "");
                        const folderPath = "/../../public/images/products/" + folderName;
                        fs.mkdir(__dirname + folderPath, (err) => {
                            if (err) {
                                return next(err);
                            }
                            let jnum = 0;
                            const imgUrlArr = [];
                            for (const imageData of req.body.imageFilesData) {
                                const base64Data = imageData.data.split(";base64,")[1];
                                const uID = uniqid.time();
                                fs.writeFile(__dirname + folderPath + "/" + uID + "." +
                                    imageData.type, base64Data, { encoding: "base64" }, (fileErr) => {
                                    if (fileErr) {
                                        return next(fileErr);
                                    }
                                    else {
                                        imgUrlArr.push({
                                            url: "./assets/images/products/" + folderName + "/" + uID + "." + imageData.type,
                                        });
                                        jnum++;
                                        if (jnum === req.body.imageFilesData.length) {
                                            const newProduct = new Product_model_1.Product({
                                                boxsize: req.body.boxsize,
                                                depth: req.body.depth,
                                                description: req.body.description,
                                                imageFilesData: imgUrlArr,
                                                length: req.body.length,
                                                package: req.body.package,
                                                title: req.body.title,
                                                weight: req.body.weight,
                                                wide: req.body.wide,
                                            });
                                            (() => __awaiter(this, void 0, void 0, function* () {
                                                try {
                                                    const createProduct = yield Product_model_1.Products.create(newProduct);
                                                    if (createProduct) {
                                                        res.json({ message: "Product has been successfully stored", success: true });
                                                    }
                                                    else {
                                                        this.throwError("Can\"t register user", 500, next);
                                                    }
                                                }
                                                catch (storingErr) {
                                                    return next(storingErr);
                                                }
                                            }))();
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            }
            catch (err) {
                return next(err);
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
