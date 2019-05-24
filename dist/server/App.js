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
const express = require("express");
// Compression should be managed by nginx server in production
// import * as compression from "compression"
const mongoose = require("mongoose");
const path = require("path");
const config_1 = require("./config");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const io = require("socket.io");
const http = require("http");
const User_model_1 = require("./models/User.model");
const Email_router_1 = require("./routes/Email.router");
const Api_router_1 = require("./routes/Api.router");
const Order_router_1 = require("./routes/Order.router");
const Payment_router_1 = require("./routes/Payment.router");
const PaymentConfirmation_router_1 = require("./routes/PaymentConfirmation.router");
const Product_router_1 = require("./routes/Product.router");
const User_router_1 = require("./routes/User.router");
class App {
    constructor() {
        this.app = express();
        this.mongoose = mongoose;
        this.db = this.mongoose.connection;
        this.router = express.Router();
        this.http = http.createServer(this.app);
        this.io = io(this.http);
        this.config();
        this.routes();
        this.onError();
    }
    /*
    * Methode for establish connection with Mongo DB
    */
    dbConnect() {
        this.mongoose.connect(config_1.default.mongo);
        this.db.on("error", console.error.bind(console, "connection error:"));
        this.db.once("open", () => console.log("Connected to db"));
    }
    /*
   * Basic configuraiton of the application
   */
    config() {
        //
        this.app.use(helmet());
        // Morgan should be off in production
        this.app.use(morgan("dev"));
        this.app.set('trust proxy', true);
        this.app.use(bodyParser.urlencoded({ parameterLimit: 10000, limit: "5mb", extended: true }));
        this.app.use(bodyParser.json({ limit: "5mb" }));
        // Serve static files from imaginary /assets directory
        // Should be managed by nginx server in production
        this.app.use("/assets", express.static(__dirname + "/../public/"));
        // console.log(__dirname + "/../public/");
        this.app.set("views", path.join(__dirname, "../views"));
        // Set pug as default template engine
        this.app.set("view engine", "pug");
        // this.app.locals.pretty = false; // False in production
        // Connect to DB
        this.dbConnect();
    }
    /*
    * Methode for catch all errors from application
    */
    onError() {
        this.app.use((err, req, res, next) => {
            if (err) {
                // console.log(err);
                res.status(err.status || 500).json({ message: err.message, success: false });
            }
            next();
        });
    }
    /*
    * Methode listing all routes of the application
    */
    routes() {
        this.router.get("/", (req, res) => {
            console.log('In index route');
            res.render("index", { page: "Tonap - Slovenský laboratórny materiál" });
        });
        this.router.get("/admin", (req, res) => { res.render("admin", { page: "Admin" }); });
        this.router.get("/admin/setup", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.Users.findOne({ role: 2 });
            if (!user) {
                res.render("admin", { page: "Admin" });
            }
            else {
                res.render("error", { page: "Admin" });
            }
        }));
        this.router.get("/admin/:action", (req, res) => {
            const title = req.params.action.charAt(0).toUpperCase() + req.params.action.substr(1);
            res.render("admin", { page: `Tonap | Admin ${title}` });
        });
        this.router.get("/reklamacny-poriadok", (req, res) => {
            res.render("claim-conditions", { page: "Reklamačný poriadok - Tonap - Slovenský laboratórny materiál" });
        });
        this.router.get("/ochrana-osobnych-udajov", (req, res) => { res.render("gdpr", { page: `GDPR - Tonap - Slovenský laboratórny materiál` }); });
        this.router.get("/online-objednavka", (req, res) => { res.render("online-order", { page: "Objednávky - Tonap - Slovenský laboratórny materiál" }); });
        this.router.get("/obchodne-podmienky", (req, res) => {
            res.render("business-conditions", { page: "Obchodné podmienky - Tonap - Slovenský laboratórny materiál" });
        });
        this.io.on("connection", (socket) => {
            const admin = this.io.of("/admin");
            socket.on("order created", () => {
                admin.emit("order been created", { success: true });
            });
        });
        this.app.use("/api", Api_router_1.default);
        this.app.use(Email_router_1.default);
        this.app.use(User_router_1.default);
        this.app.use(Order_router_1.default);
        this.app.use(Payment_router_1.default);
        this.app.use(PaymentConfirmation_router_1.default);
        this.app.use(Product_router_1.default);
        this.app.use(this.router);
    }
}
exports.default = new App().http;
