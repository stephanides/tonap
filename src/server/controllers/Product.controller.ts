import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import * as fs from "fs";
import { Product, Products } from "../models/Product.model";
import * as uniqid from "uniqid";

import IError from "../interfaces/Error.inerface";
import { IProduct } from "../interfaces/Product.interface";

export default class ProductController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productItems: object[] = await Products.find({ active: true });

      if (!productItems || productItems.length < 1) {
        res.status(404).json({ message: "Not found.", success: false });
      } else {
        res.json({
          message: productItems,
          success: true,
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productItem: IProduct = await Products.findOne({ title: req.body.title });

      if (productItem) {
        res.status(409).json({ message: "Product allready exist", success: false });
      } else {
        if (req.body.imageFilesData && req.body.imageFilesData.length > 0) {
          const folderName: string = req.body.title.toLowerCase().replace("/\s+/g", "-");
          const folderPath: string = "/../../public/images/products/" + folderName;

          fs.mkdir(__dirname + folderPath, (err) => {
            if (err) {
              return next(err);
            }

            let jnum: number = 0;
            const imgUrlArr: object[] = [];

            for (const imageData of req.body.imageFilesData) {
              const base64Data = imageData.data.split(";base64,")[1];
              const uID = uniqid.time();

              fs.writeFile(__dirname + folderPath + "/" + uID + "." +
              imageData.type, base64Data, { encoding: "base64" }, (fileErr) => {
                if (fileErr) {
                  return next(fileErr);
                } else {
                  imgUrlArr.push({
                    url: "./assets/images/products/" + folderName + "/" + uID + "." + imageData.type,
                  });
                  jnum++;

                  if (jnum === req.body.imageFilesData.length) {
                    const newProduct: IProduct = new Product({
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

                    (async () => {
                      try {
                        const createProduct: object = await Products.create(newProduct);

                        if (createProduct) {
                          res.json({ message: "Product has been successfully stored", success: true });
                        } else {
                          this.throwError("Can\"t register user", 500, next);
                        }
                      } catch (storingErr) {
                        return next(storingErr);
                      }
                    })();
                  }
                }
              });
            }
          });
        }
      }
    } catch (err) {
      return next(err);
    }
  }

  private throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: IError = new Error(errMessage);

    err.status = errStatus;
    return next(err);
  }
}
