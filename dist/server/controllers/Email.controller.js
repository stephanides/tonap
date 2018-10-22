"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class Email {
    constructor() {
        this.transporter = nodemailer.createTransport({
            auth: {
                pass: "codebrothers963",
                user: "info@codebrothers.sk",
            },
            host: "smtp.zoho.eu",
            port: 465,
            secure: true,
            ignoreTLS: true,
        });
    }
    sendEmail(req, res, next) {
        this.transporter.sendMail({
            from: "info@codebrothers.sk",
            subject: "Tonap | Správa od: " + req.body.name,
            html: `Máte novú správu od užívateľa <strong>${req.body.name}</strong>.<br />
      Email užívateľa: ${req.body.email}<br /><br />
      Predmet správy: ${req.body.subject}<br />
      Obsah správy:<br />
      ${req.body.message}`,
            to: "info@codebrothers.sk",
        }, (err) => {
            if (err) {
                const genErr = err;
                const newErr = new Error(genErr.response);
                newErr.status = genErr.status;
                return next(newErr);
            }
            else {
                res.json({ message: "Mail has been successfully sent", success: true });
            }
        });
    }
}
exports.Email = Email;
