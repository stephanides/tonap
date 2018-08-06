import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Order, Orders } from "../models/Order.model";
import IError from "../interfaces/Error.inerface";
import IOrder from "../interfaces/Order.interface";

export default class OrderController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const order = await Orders.findOne({ orderNum: req.body.orderNum });

    if (order) {
      this.throwError("Order allready exist", 409, next);
    } else {
      const newOrder: IOrder = new Order({
        city: req.body.city,
        company: req.body.company,
        email: req.body.email,
        ico: req.body.ico,
        name: req.body.name,
        orderNum: req.body.orderNum,
        products: req.body.products,
        street: req.body.street,
        surname: req.body.surname,
      });

      try {
        const asyncCreateOrder = await Orders.create(newOrder);

        if (asyncCreateOrder) {
          res.json({ message: "Order has been created", success: true });
        } else {
          this.throwError("Can\"t create order", 500, next);
        }
      } catch (err) {
        return next(err);
      }
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    const orders = await Orders.find({});

    if (!orders || orders.length < 1) {
      this.throwError("Nothing found", 404, next);
    } else {
      res.json({ data: orders, success: true });
    }
  }

  private throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: IError = new Error(errMessage);

    err.status = errStatus;
    return next(err);
  }
}
