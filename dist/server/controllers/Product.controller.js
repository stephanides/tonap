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
const Product_model_1 = require("../models/Product.model");
class ProductController {
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productItem = yield Product_model_1.Products.findOne({ title: req.body.title });
                if (productItem) {
                    res.status(409).json({ message: "Product allready exist", success: false });
                }
                else {
                    console.log(req.body);
                    res.json({ message: "Will store product data", success: true });
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = ProductController;
