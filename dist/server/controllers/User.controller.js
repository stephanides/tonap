"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config_1 = require("../config");
// import * as nodemailer from "nodemailer";
const jwt = require("jsonwebtoken");
const User_model_1 = require("../models/User.model"); // IUserDocument,
class UserController {
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
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userItem = yield User_model_1.Users.findOne({ email: req.body.email });
                if (!userItem) {
                    this.throwError("User not found", 404, next);
                }
                else {
                    if (userItem && bcrypt.compareSync(req.body.password, userItem.password)) {
                        this.setToken(userItem);
                        res.json({
                            message: "Welcome " + userItem.firstName,
                            success: true,
                            user: {
                                firstName: userItem.firstName,
                                lastName: userItem.lastName,
                                role: userItem.role,
                                token: this.token,
                            },
                        });
                    }
                    else {
                        this.throwError("Bad username or password", 401, next);
                    }
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userItem = yield User_model_1.Users.findOne({ email: req.body.email });
                if (userItem) {
                    this.throwError("User allready exist", 409, next);
                }
                else {
                    const userData = {};
                    for (let i = 0; i < Object.keys(req.body).length; i++) {
                        if (Object.keys(req.body)[i] !== "password") {
                            userData[Object.keys(req.body)[i]] = Object.values(req.body)[i];
                        }
                        else {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(req.body.password, salt, (hashErr, hash) => __awaiter(this, void 0, void 0, function* () {
                                    // Store hash in your password DB.
                                    userData.password = hash;
                                    userData.role = 2;
                                    const newUser = new User_model_1.User(userData);
                                    const userCreate = yield User_model_1.Users.create(newUser);
                                    if (userCreate) {
                                        res.json({ message: "User has been sucessfully registered", success: true });
                                        // this.sendEmail(req, res, next);
                                    }
                                    else {
                                        this.throwError("Can\"t register user", 500, next);
                                    }
                                }));
                            });
                        }
                    }
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
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
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToUpdate = yield User_model_1.Users.findOne({ _id: mongoose.Types.ObjectId(req.body._id) });
                if (!userToUpdate) {
                    this.throwError("No user found", 404, next);
                }
                else {
                    const updatedUser = new User_model_1.User(req.body);
                    const userUpdate = yield User_model_1.Users.update({ _id: mongoose.Types.ObjectId(req.body._id) }, updatedUser);
                    if (userUpdate) {
                        res.json({ message: "User has been successfully updated", success: true });
                    }
                    else {
                        this.throwError("Can\"t update user data", 500, next);
                    }
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    setToken(item) {
        const payload = {
            id: item.id,
            role: item.role,
        };
        const token = jwt.sign(payload, config_1.default.secret, { expiresIn: 8 * 60 * 60 });
        this.token = token;
    }
    throwError(errMessage, errStatus, next) {
        const err = new Error(errMessage);
        err.status = errStatus;
        return next(err);
    }
}
exports.UserController = UserController;
