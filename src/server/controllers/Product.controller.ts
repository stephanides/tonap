import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import { Product, Products } from "../models/Product.model";

import { IProduct } from "../interfaces/Product.interface";

export default class ProductController {
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productItem: IProduct = await Products.findOne({ title: req.body.title });

      if (productItem) {
        res.status(409).json({ message: "Product allready exist", success: false });
      } else {
        console.log(req.body);

        res.json({ message: "Will store product data", success: true });
      }
    } catch (err) {
      return next(err);
    }
  }
}
