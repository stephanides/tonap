import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcryptjs";
import config from "../config";
// import * as nodemailer from "nodemailer";
import * as jwt from "jsonwebtoken";

// import IConfig from "../interfaces/Config.interface";
import IError from "../interfaces/Error.inerface";
import IPayload from "../interfaces/Payload.interface";
import { IUser } from "../interfaces/User.interface";
import { User, Users } from "../models/User.model"; // IUserDocument,

export class UserController {
  // private transporter: nodemailer.Transporter;
  private token: string;
  // private salt: string;

  constructor() {
    this.token = "";
    // this.salt = bcrypt.genSaltSync(config["saltRounds"]);
    /*this.transporter = nodemailer.createTransport({
      auth: {
        pass: "codebrothers963",
        user: "info@codebrothers.sk",
      },
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // ssl
    });*/

    this.setToken = this.setToken.bind(this);
  }

  /*async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users: Array<object> = await Users.find({ role: { $nin: [1, 2] } })

      if(!users || users.length === 0)
        this.throwError("No user found", 404, next)
      else
        res.json({ data: users, success: true })
    }
    catch(err) {
      return next(err)
    }
  }*/

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userItem: IUser = await Users.findOne({ email: req.body.email });

      if (!userItem) {
        this.throwError("User not found", 404, next);
      } else {
         if (userItem && bcrypt.compareSync(req.body.password, userItem.password)) {
          this.setToken(userItem);

          res.json({
            message: "Welcome " + userItem.firstName,
            success: true,
            token: this.token,
            user: {
              approved: userItem.approved,
              // city: userItem["city"],
              firstName: userItem.firstName,
              role: userItem.role,
            },
          });
        } else {
          this.throwError("Bad username or password", 401, next);
        }
      }
    } catch (err) {
      return next(err);
    }
  }

  /*async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userItem: object = await Users.findOne({ email: req.body.email })

      if(userItem)
        this.throwError("User allready exist", 409, next)
      else {
        let userData: object = {} as IUser

        for(let i: number = 0; i < Object.keys(req.body).length; i++) {
          if(Object.keys(req.body)[i] !== "password")
            userData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]
          else
            userData["password"] = bcrypt.hashSync(req.body.password, this.salt)
        }

        const newUser: object = new User(userData as IUser)
        const userCreate: object = await Users.create(newUser)

        if(userCreate) {
          res.json({ message: "User has been sucessfully registered", success: true })
          this.sendEmail(req, res, next)
        }
        else
          this.throwError("Can\"t register user", 500, next)
      }
    }
    catch(err) {
      return next(err)
    }
  }*/

  /*sendEmail(req: Request, res: Response, next: NextFunction) {
    this.transporter.sendMail({
      from: "info@codebrothers.sk",
      to: "info@codebrothers.sk", //TODO change for carwellness e-mail address in production
      subject: "Carwellness | Nová registrácia od: "+req.body.email,
      text: "Bol zaregistrovaný používaťeľ "+req.body.firstName+" "+req.body.lastName+" s e-mailovou adresou:\n"+
        req.body.email
    }, err => {
      if(err) {
        const newErr = new Error(err["response"])
        newErr["status"] = err["responseCode"]

        return next(newErr)
      }
      else res.json({ message: "Mail has been successfully sent", success: true })
    })
  }*/

  public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userToUpdate: object = await Users.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });

      if (!userToUpdate) {
        this.throwError("No user found", 404, next);
      } else {
        const updatedUser: object = new User(req.body as IUser);
        const userUpdate: object = await Users.update({ _id: mongoose.Types.ObjectId(req.body._id) }, updatedUser);

        if (userUpdate) {
          res.json({ message: "User has been successfully updated", success: true });
        } else {
          this.throwError("Can\"t update user data", 500, next);
        }
      }
    } catch (err) {
      return next(err);
    }
  }

  private setToken(item: IPayload): void {
    const payload: IPayload = {
      id: item.id,
      role: item.role,
    };
    const token: string = jwt.sign(payload, config.secret, { expiresIn: 8 * 60 * 60 });

    this.token = token;
  }

  private throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: IError = new Error(errMessage);

    err.status = errStatus;
    return next(err);
  }
}
