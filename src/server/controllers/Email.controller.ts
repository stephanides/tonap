// import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import * as nodemailer from "nodemailer";
import IError from "../interfaces/Error.inerface";

export class Email {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      auth: {
        pass: "codebrothers963",
        user: "info@codebrothers.sk",
      },
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // ssl
    });
  }

  public sendEmail(req: Request, res: Response, next: NextFunction) {
    this.transporter.sendMail({
      from: req.body.email, // "info@codebrothers.sk"
      subject: "Tonap | Správa od: " + req.body.name,
      html: `Máte novú správu od užívateľa <strong>${req.body.name}</strong>.<br />
      Email užívateľa: ${req.body.email}<br />
      Predmet správy: ${req.body.subject}<br />
      Obsah správy:<br /><br />
      ${req.body.message}`,
      to: "info@codebrothers.sk", // TODO change for Tonap e-mail address in production
    }, (err) => {
      if (err) {
        const genErr: IError = err;
        const newErr: IError = new Error(genErr.response);
        newErr.status = genErr.status as number;

        return next(newErr);
      } else {
        res.json({ message: "Mail has been successfully sent", success: true });
      }
    });
  }
}
