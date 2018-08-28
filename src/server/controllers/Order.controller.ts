// import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Order, Orders } from "../models/Order.model";
import IError from "../interfaces/Error.inerface";
import IOrder from "../interfaces/Order.interface";
import * as nodemailer from "nodemailer";

export default class OrderController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const order = await Orders.findOne({ orderNum: req.body.orderNum });

    if (order) {
      this.throwError("Order allready exist", 409, next);
    } else {
      const orderObj: any = {
        city: req.body.city,
        company: req.body.company,
        email: req.body.email,
        ico: req.body.ico,
        name: req.body.name,
        orderNum: req.body.orderNum,
        products: req.body.products,
        street: req.body.street,
        surname: req.body.surname,
      };
      const productArr: object[] = [];

      orderObj.products = req.body.products;

      const newOrder: IOrder = new Order(orderObj);

      try {
        const asyncCreateOrder = await Orders.create(newOrder);

        if (asyncCreateOrder) {
          const mailSubject: string = "TONAP: Informácia o doručení objednávky";
          const mailBody: string = "Dobrý deň pán/pani " + req.body.name + " " + req.body.surname + ",\n\n" +
          "Ďakujeme za Vašu objednávka u spločnosti Tonap s. r. o." +
          "vaša objednácka číslo: " + req.body.orderNum + " bola prijatá na spracovanie.\n" +
          "O ďalšom priebehu objednávky Vás budeme informovať prostredníctvom emailu.\n\n" +
          "S prianim pekného dňa,\ntím Tonap s. r. o.";

          this.sendMailNotification(req, next, mailSubject, mailBody, () => {
            res.json({ message: "Order has been created", success: true });
          });
        } else {
          this.throwError("Can\"t create order", 500, next);
        }
      } catch (err) {
        return next(err);
      }
    }
  }

  public async handleEmailNotification(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    res.json({ message: JSON.stringify(req.body), success: true});
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    const orders = await Orders.find({});

    if (!orders || orders.length < 1) {
      this.throwError("Nothing found", 404, next);
    } else {
      res.json({ data: orders, success: true });
    }
  }

  private sendMailNotification(
    req: Request, next: NextFunction,
    emailSubject: string, emailBody: string, callBack: () => void) {
    const mailTransporter: nodemailer.Transporter = nodemailer.createTransport({
      auth: {
        pass: "codebrothers963",
        user: "info@codebrothers.sk",
      },
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
    });
    const mailOptions: object = {
      from: "info@codebrothers.sk",
      subject: emailSubject,
      text: emailBody,
      to: req.body.email,
    };

    mailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        this.throwError(err.message, 500, next);
      } else {
        console.log("Message has been sent.");
        if (typeof callBack === "function") {
          callBack();
        }
      }
    });
  }

  private throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: IError = new Error(errMessage);

    err.status = errStatus;
    return next(err);
  }
}
