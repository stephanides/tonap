import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import IError from "../interfaces/Error.inerface";
import ISale from "../interfaces/Sale.interface";
import { Sale, Sales } from "../models/Sale.model"; // IUserDocument,

export class SaleController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const saleExist: ISale = await Sales.findOne({ saleCode: req.body.saleCode });

      if (saleExist) {
        this.throwError("Sale code allready exist", 409, next);
      } else {
        const saleData: object = {
          saleCode: req.body.saleCode,
          sale: req.body.sale,
        } as ISale;
        const newSale: object = new Sale(saleData as ISale);

        await Sales.create(newSale);

        res.json({
          data: "Sale has been created",
          success: true,
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const saleItems: object[] = await Sales.find({});

      if (!saleItems || saleItems.length < 1) {
        res.status(404).json({ message: "Not found.", success: false });
      } else {
        res.json({
          data: saleItems,
          success: true,
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  public async updateSale(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const saleToUpdate: object = await Sales.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });

      if (!saleToUpdate) {
        this.throwError("No sale found", 404, next);
      } else {
        const updatedSale: object = new Sale(req.body as ISale);
        const saleUpdate: object = await Sales.update({ _id: mongoose.Types.ObjectId(req.body._id) }, updatedSale);

        if (saleUpdate) {
          res.json({ message: "Sale has been successfully updated", success: true });
        } else {
          this.throwError("Can\"t update sale data", 500, next);
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
