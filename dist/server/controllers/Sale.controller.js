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
const Sale_model_1 = require("../models/Sale.model"); // IUserDocument,
class SaleController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleExist = yield Sale_model_1.Sales.findOne({ saleCode: req.body.saleCode });
                if (saleExist) {
                    this.throwError("Sale code allready exist", 409, next);
                }
                else {
                    const saleData = {
                        saleCode: req.body.saleCode,
                        sale: req.body.sale,
                    };
                    const newSale = new Sale_model_1.Sale(saleData);
                    yield Sale_model_1.Sales.create(newSale);
                    res.json({
                        data: "Sale has been created",
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
                const saleItems = yield Sale_model_1.Sales.find({});
                if (!saleItems || saleItems.length < 1) {
                    res.status(404).json({ message: "Not found.", success: false });
                }
                else {
                    res.json({
                        data: saleItems,
                        success: true,
                    });
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    updateSale(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleToUpdate = yield Sale_model_1.Sales.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });
                if (!saleToUpdate) {
                    this.throwError("No sale found", 404, next);
                }
                else {
                    const updatedSale = new Sale_model_1.Sale(req.body);
                    const saleUpdate = yield Sale_model_1.Sales.update({ _id: mongoose.Types.ObjectId(req.body._id) }, updatedSale);
                    if (saleUpdate) {
                        res.json({ message: "Sale has been successfully updated", success: true });
                    }
                    else {
                        this.throwError("Can\"t update sale data", 500, next);
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
exports.SaleController = SaleController;
