import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { Order, Orders } from "../models/Order.model";
import IOrder from "../interfaces/Order.interface";

export default class PaymentController {
  public async manage (req: Request, res: Response, next: NextFunction) {
    try {
      const lastOrderNum: number = await this.findLastOrderNum() as number;
      const orderNum = lastOrderNum ?
        new Date().getFullYear() + (
          (lastOrderNum + 1) > 99 ? String(lastOrderNum + 1) : (
            (lastOrderNum + 1) > 9 ? "0" + (lastOrderNum + 1) : "00" + (lastOrderNum + 1)
          )
        ) : new Date().getFullYear() + "001";

      const AMT = String(req.body.fullPrice);
      const CURR = '978';
      const IPC = String(req.ip); // req.connection.remoteAddress
      const KEY = '7248666c5a6b4f3753526179624a7a7649687342525453536f34662d7442614e597938384964744a30527a4e574f6e794e4c73715f526d6c6a6b343131554778';
      const KS = '0308';
      const MID = '7279';
      const NAME = `${req.body.name} ${req.body.surname}`;
      const RURL = 'https://tonap.sk/payment-confirmation'; // 'https://moja.tatrabanka.sk/cgi-bin/e-commerce/start/example.jsp';
      const TIMESTAMP = this.calculateTimeStamp();
      const VS = orderNum;
      const HMAC_STRING = MID + AMT + CURR + VS + RURL + IPC + NAME + TIMESTAMP;

      const HMAC = await this.hash_hmac(HMAC_STRING, KEY, next);
      const url = `https://moja.tatrabanka.sk/cgi-bin/e-commerce/start/cardpay?MID=${MID}&AMT=${AMT}&CURR=${CURR}&VS=${VS}&RURL=${RURL}&IPC=${IPC}&NAME=${NAME}&TIMESTAMP=${TIMESTAMP}&HMAC=${HMAC}`;

      res.json({ message: 'CardPay', url, success: true });
    } catch (err) {
      return next(err);
    }
  }

  private calculateTimeStamp(): string {
    const date = new Date();
    const DD = date.getDate();
    const MM = date.getMonth() + 1;
    const YYYY = date.getFullYear();
    const HH = date.getHours();
    const MI = date.getMinutes();
    const SS = date.getSeconds();

    const timestamp = `${DD < 10 ? '0' + DD : DD}${MM < 10 ? '0' + MM : MM}${YYYY}${HH < 10 ? '0' + HH : HH}${MI < 10 ? '0' + MI : MI}${SS < 10 ? '0' + SS : SS}`;

    return timestamp;
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

  private hash_hmac(string: string, key: string, next: NextFunction) {
    return new Promise(async (resolve, reject) => {
      try {
        const hmac = crypto.createHmac('SHA256', Buffer.from(key, 'hex'));
  
        hmac.update(string);

        resolve(hmac.digest('hex'));
      } catch (err) {
        return next(err);
      }
    });
  }
}