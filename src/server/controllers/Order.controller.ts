import { Request, Response, NextFunction } from "express";
import { Order, Orders } from "../models/Order.model";
import IError from "../interfaces/Error.inerface";
import IOrder from "../interfaces/Order.interface";
import * as nodemailer from "nodemailer";

export default class OrderController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const lastOrderNum: number = await this.findLastOrderNum() as number;
      const orderNum = lastOrderNum ?
        new Date().getFullYear() + (
          (lastOrderNum + 1) > 99 ? String(lastOrderNum + 1) : (
            (lastOrderNum + 1) > 9 ? "0" + (lastOrderNum + 1) : "00" + (lastOrderNum + 1)
          )
        ) : new Date().getFullYear() + "001";
      const orderObj: any = {
        city: req.body.city,
        company: req.body.company,
        email: req.body.email,
        ico: req.body.ico,
        name: req.body.name,
        orderNum,
        products: req.body.products,
        street: req.body.street,
      };
      const productArr: object[] = [];

      orderObj.products = req.body.products;

      const newOrder: IOrder = new Order(orderObj);
      const asyncCreateOrder = await Orders.create(newOrder);

      if (asyncCreateOrder) {
        const mailSubject: string = "TONAP: Informácia o doručení objednávky";
        const mailBody: string = `Dobrý deň pán/pani ${req.body.name}<br /><br />
        Ďakujeme za Vašu objednávka u spločnosti <strong>Tonap s. r. o.</strong><br /><br />
        Vaša objednácka číslo: <strong><i>${orderNum}</i></strong> bola prijatá na spracovanie.<br />
        O ďalšom priebehu objednávky Vás budeme informovať prostredníctvom emailu.<br /><br />
        S prianim pekného dňa,<br />tím <strong>Tonap s. r. o.</strong>`;

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

  private findLastOrderNum() {
    return new Promise(async (resolve, reject) => {
      const orders = await Orders.find({});

      if (orders.length > 0) {
        let numbers: number[] = [];

        for (let i = 0; i < orders.length; i++) {
          let num: number, tempNum2Dig: number, tempNum3Dig: number;
          const numStringToParse = String(orders[i].orderNum);

          for (let j = 0; j < numStringToParse.length; j++) {
            if (j === 4 && parseInt(numStringToParse[j]) > 0) {
              tempNum3Dig = parseInt(numStringToParse[j]);
              console.log("3digit start num:");
              console.log(tempNum3Dig);
            }
            if (j === 5 && parseInt(numStringToParse[j]) > 0) {
              tempNum2Dig = parseInt(numStringToParse[j]);
            }
          }

          num = tempNum3Dig ?
            parseInt(String(tempNum3Dig) + numStringToParse.charAt(5) + numStringToParse.charAt(6)) :
            (
              tempNum2Dig ?
              parseInt(String(tempNum2Dig + numStringToParse.charAt(6))) :
              parseInt(numStringToParse.charAt(6))
            );

          numbers.push(num);
        }

        const orderNum = Math.max.apply(Math, numbers);

        resolve(orderNum);
      } else {
        resolve(0);
      }
    });
  }

  private sendMailNotification(
    req: Request,
    next: NextFunction,
    emailSubject: string,
    emailBody: string,
    callBack: () => void
  ): void {
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
      from: "info@codebrothers.sk", // TODO change for actual TONAP email address
      subject: emailSubject,
      html: emailBody,
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
