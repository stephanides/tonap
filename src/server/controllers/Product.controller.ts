import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import * as fs from "fs";
import { Product, Products } from "../models/Product.model";
import * as uniqid from "uniqid";

import IError from "../interfaces/Error.inerface";
import { IProduct } from "../interfaces/Product.interface";

export default class ProductController {
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.params.id + "\n");
      const product = await Products.find({ _id: mongoose.Types.ObjectId(req.params.id) });

      if (!product) {
        this.throwError("Not found", 404, next);
      } else {
        // const productToDelete = await Products.deleteOne(product);

        // console.log(productToDelete);
        console.log(product);
        res.json({ message: "Product has been deleted", success: true });
      }
    } catch (err) {
      return next(err);
    }
  }
  public async getActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productItems: object[] = await Products.find({ active: true });

      if (!productItems || productItems.length < 1) {
        res.status(404).json({ message: "Not found.", success: false });
      } else {
        res.json({
          data: productItems,
          success: true,
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productItems: object[] = await Products.find({});

      if (!productItems || productItems.length < 1) {
        res.status(404).json({ message: "Not found.", success: false });
      } else {
        res.json({
          data: productItems,
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
          const folderName: string = req.body.title.toLowerCase().replace(/\s+/g, "-");
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
                      category: req.body.category,
                      depth: req.body.depth,
                      description: req.body.description,
                      imageFilesData: imgUrlArr,
                      length: req.body.length,
                      notSterile: req.body.notSterile,
                      notSterileProductMaxCount: req.body.notSterileProductMaxCount,
                      notSterileProductMaxPackageCount: req.body.notSterileProductMaxPackageCount,
                      notSterileProductMinCount: req.body.notSterileProductMinCount,
                      notSterileProductMinPackageCount: req.body.notSterileProductMinPackageCount,
                      sterile: req.body.sterile,
                      sterileProductMaxCount: req.body.sterileProductMaxCount,
                      sterileProductMaxPackageCount: req.body.sterileProductMaxPackageCount,
                      sterileProductMinCount: req.body.sterileProductMinCount,
                      sterileProductMinPackageCount: req.body.sterileProductMinPackageCount,
                      title: req.body.title,
                      volume: req.body.volume,
                      weight: req.body.weight,
                      wide: req.body.wide,
                    });

                    const asyncCreate = async () => {
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
                    };

                    asyncCreate();
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

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productToUpdate = await Products.find({ _id: mongoose.Types.ObjectId(req.body._id) });

    if (!productToUpdate) {
      this.throwError("Not found", 404, next);
    } else {
      const dataToUpdate = new Product(req.body as IProduct);
      const updatedProduct = await Products.update({ _id: mongoose.Types.ObjectId(req.body._id) }, dataToUpdate);

      if (updatedProduct) {
        res.json({ message: "Product has been successfully updated", success: true });
      } else {
        this.throwError("Can\'t update claim data", 500, next);
      }
    }
  }

  private throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: IError = new Error(errMessage);

    err.status = errStatus;
    return next(err);
  }
}
