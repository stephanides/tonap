import {Types} from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Order, Orders } from "../models/Order.model";
import IError from "../interfaces/Error.inerface";
import IOrder from "../interfaces/Order.interface";
import * as nodemailer from "nodemailer";
// import * as OP from "onlineplatby";

export default class OrderController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const lastOrderNum: number = await this.findLastOrderNum() as number;
      const orderNum = lastOrderNum ?
        new Date().getFullYear() + (
          (lastOrderNum + 1) > 99 ?
            String(lastOrderNum + 1) : (
              (lastOrderNum + 1) > 9 ? "0" + (lastOrderNum + 1) : "00" + (lastOrderNum + 1)
            )
        ) : new Date().getFullYear() + "001";
      const orderObj: any = {
        // city: req.body.city,
        billingAddress: req.body.billingAddress,
        deliveryAddress: req.body.deliveryAddress,
        company: req.body.company,
        email: req.body.email,
        fullPrice: req.body.fullPrice,
        ico: req.body.ico,
        dic: req.body.dic,
        location: req.body.location,
        message: req.body.message,
        name: req.body.name,
        nettPrice: req.body.nettPrice,
        orderNum,
        paymentMethod: req.body.paymentMethod,
        paymenthPrice: req.body.paymenthPrice,
        phone: req.body.phone,
        // psc: req.body.psc,
        products: req.body.products,
        shippingMethod: req.body.shippingMethod,
        shippingPrice: req.body.shippingPrice,
        // street: req.body.street,
        surname: req.body.surname,
      };
      // const productArr: object[] = [];

      orderObj.products = req.body.products;

      const newOrder: IOrder = new Order(orderObj);
      const asyncCreateOrder = await Orders.create(newOrder);
      
      if (asyncCreateOrder) {
        const products: object[] = req.body.products;
        /* let productRows: string[] = [];

        for (let i = 0; i < products.length; i++) {
          let row: string = `<div>
          <div>${i+1}</div>
          <div>${(products as any)[i].title}</div>
          <div>${(products as any)[i].isSterile ? "Sterilné" : "Nesterilné"}</div>
          <div>${(products as any)[i].package}</div>
          <div>${(products as any)[i].boxSize}</div>
          <div>${(products as any)[i].boxCount}</div>
        </div>`;
          productRows.push(row);
        } */

        const mailSubject: string = "TONAP: Informácia o doručení objednávky";
        const mailBody: string = `Dobrý deň pán/pani ${req.body.name} ${req.body.surname}.<br /><br />
        Ďakujeme za Vašu objednávka u spločnosti <strong>TONAP</strong> s. r. o.<br /><br />
        Vaša objednácka číslo: <strong><i>${orderNum}</i></strong> bola prijatá na spracovanie.<br /><br />
        <strong>Súhrn objednávky:</strong><br /><br />
        <table border="0" cellspacing="0" cellpadding="0">
        <thead>
        <tr><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">#</th>
        <th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">Názov produktu</th>
        <th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">Variant produktu</th>
        <th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">Balené po.</th>
        </thead>
        <tbody>
        ${products.reduce((a, b, i) => {
          return `${a}<tr><td style="border: 1px solid black; border-collapse: collapse; padding: 5px;">${i+1}</td><td style="border: 1px solid black; border-collapse: collapse; padding: 5px;">${(b as any).title}</td><td style="border: 1px solid black; border-collapse: collapse; padding: 5px;">${(b as any).variantName}</td><td style="border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: center;">${(b as any).count}</td></tr>`;
        }, "")}
        </tbody></table><br/>
        O ďalšom priebehu objednávky Vás budeme informovať prostredníctvom emailu.<br /><br />
        V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />
        Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />
        S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.<br /><br />
        <strong>TONAP</strong> s.r.o.<br />
        Na hore 1727/4<br />
        040 22 Košice<br />
        IČO: 51334011<br />
        IČ DPH: SK2120679242<br />
        +421 918 243 753`;

        this.sendMailNotification(req, next, req.body.email, mailSubject, mailBody, () => {
          // Handle CardPay redirect here
          let url = undefined;

          // HANDLE and populate CardPay redirect URL
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
    try {
      const order = await Orders.findOne({_id: Types.ObjectId(req.body.orderId)});
      console.log(order);

      if (!order) {
        this.throwError("Order not found", 404, next);
      } else {
        const dataToUpdate = order;
        const deliveryTimes = ["2. pracovných dní", "3. pracovných dní", "4. pracovných dní", "5. pracovných dní", "10. pracovných dní", "15. pracovných dní", "20. pracovných dní", "viac ako 20. pracovných dní"];

        /*if ((typeof req.body.cancellation !== "undefined") && req.body.cancellation !== order.cancellation) {
          dataToUpdate.cancellation = req.body.cancellation;
        } else {
          dataToUpdate.state = req.body.state;
          dataToUpdate.dateModified = new Date().toISOString();
          dataToUpdate.deliveryTime = req.body.deliveryTime;
        }*/

        dataToUpdate.state = req.body.state;
        dataToUpdate.dateModified = new Date().toISOString();
        dataToUpdate.deliveryTime = req.body.deliveryTime;

        const updatedOrder = await Orders.update({_id: Types.ObjectId(req.body.orderId)}, dataToUpdate);

        if (updatedOrder) {
          let mailSubject: string = "TONAP: Informácia o stave objednávky";
          let mailBody: string;

          /*if (req.body.cancellation !== order.cancellation) {
            mailBody = `Dobrý deň pán/pani ${order.name}.<br /><br />
            Vaša objednávka bola stornovaná.<br /><br />
            V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />
            Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />
            S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.<br /><br />
            <strong>TONAP</strong> s.r.o.<br />
            Na hore 1727/4<br />
            040 22 Košice<br />
            IČO: 51334011<br />
            IČ DPH: SK2120679242<br />
            +421 918 243 753`;
          } else*/
          if (req.body.message) {
            mailBody = `Dobrý deň pán/pani ${order.name} ${order.surname}.<br /><br />
            ${req.body.message}<br /><br />
            V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />
            Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />
            S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.<br /><br />
            <strong>TONAP</strong> s.r.o.<br />
            Na hore 1727/4<br />
            040 22 Košice<br />
            IČO: 51334011<br />
            IČ DPH: SK2120679242<br />
            +421 918 243 753`;
          } else {
            if (req.body.state > 1 && req.body.state < 3) {
              mailBody = `Dobrý deň pán/pani ${order.name}.<br /><br />
              Vaša objednácka číslo: <strong><i>${order.orderNum}</i></strong> je vybavená.<br /><br />
              V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />
              Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />
              S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.<br /><br />
              <strong>TONAP</strong> s.r.o.<br />
              Na hore 1727/4<br />
              040 22 Košice<br />
              IČO: 51334011<br />
              IČ DPH: SK2120679242<br />
              +421 918 243 753`;
            } else if (req.body.state === 3) {
              mailBody = `Dobrý deň pán/pani ${order.name}.<br /><br />
              Vaša objednávka číslo ${order.orderNum} bola stornovaná.<br /><br />
              V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />
              Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />
              S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.<br /><br />
              <strong>TONAP</strong> s.r.o.<br />
              Na hore 1727/4<br />
              040 22 Košice<br />
              IČO: 51334011<br />
              IČ DPH: SK2120679242<br />
              +421 918 243 753`;
            } else {
              if (req.body.deliveryTime > 6) {
                mailBody = `Dobrý deň pán/pani ${order.name}.<br /><br />
                Vaša objednácka číslo: <strong><i>${order.orderNum}</i></strong> bude spracovaná a pripravená za ${deliveryTimes[req.body.deliveryTime]}.<br />
                O ďalšom stave objednávky Vás budeme informovať prostredníctvom emailu.<br /><br />
                V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />
                Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />
                S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.<br /><br />
                <strong>TONAP</strong> s.r.o.<br />
                Na hore 1727/4<br />
                040 22 Košice<br />
                IČO: 51334011<br />
                IČ DPH: SK2120679242<br />
                +421 918 243 753`;
              } else {
                mailBody = `Dobrý deň pán/pani ${order.name}.<br /><br />
                Vaša objednácka číslo: <strong><i>${order.orderNum}</i></strong> bude spracovaná a pripravená do ${deliveryTimes[req.body.deliveryTime]}.<br />
                O ďalšom stave objednávky Vás budeme informovať prostredníctvom emailu.<br /><br />
                V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />
                Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />
                S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.<br /><br />
                <strong>TONAP</strong> s.r.o.<br />
                Na hore 1727/4<br />
                040 22 Košice<br />
                IČO: 51334011<br />
                IČ DPH: SK2120679242<br />
                +421 918 243 753`;
              }
            }
          }

          this.sendMailNotification(req, next, order.email, mailSubject, mailBody, () => {
            res.json({message: "Objednávka bola úspešne zmenená", success: true});
          });
        } else {
          this.throwError("Nie je možné upraviť dáta objednávky", 500, next);
        }
      }
    } catch (err) {
      this.throwError(err.stack, 500, next);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    const orders = await Orders.find({});

    if (!orders || orders.length < 1) {
      this.throwError("Not found", 404, next);
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
    email: string,
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
      ignoreTLS: true,
    });
    const mailOptions: object = {
      from: "info@codebrothers.sk", // TODO change for actual TONAP email address
      subject: emailSubject,
      html: emailBody,
      to: email,
    };

    mailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        console.log("\n");
        this.throwError(err.message, 500, next);
      } else {
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
