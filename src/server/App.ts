import * as express from "express";
// Compression should be managed by nginx server in production
// import * as compression from "compression"
import * as mongoose from "mongoose";
import * as path from "path";
import config from "./config";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as io from "socket.io";
import * as http from "http";

import { User, IUserDocument, Users } from "./models/User.model";

import EmailRouter from "./routes/Email.router";
import ApiRouter from "./routes/Api.router";
import OrderRouter from "./routes/Order.router";
import PaymentRouter from "./routes/Payment.router";
import PaymentConfirmation from "./routes/PaymentConfirmation.router";
import ProductRouter from "./routes/Product.router";
import UserRouter from "./routes/User.router";

class App {
  public http;
  private app: express.Application;
  private db: mongoose.Connection;
  private mongoose;
  private router: express.Router;
  private io: SocketIO.Server;

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
  private dbConnect(): void {
    this.mongoose.connect(config.mongo);

    this.db.on("error", console.error.bind(console, "connection error:"));
    this.db.once("open", () => console.log("Connected to db"));
  }

   /*
  * Basic configuraiton of the application
  */
  private config(): void {
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
  private onError(): void {
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
  private routes(): void {
    this.router.get("/", (req, res) => {
      console.log('In index route');
      res.render("index", { page: "Tonap - Slovenský laboratórny materiál" });
    });
    this.router.get("/admin", (req, res) => { res.render("admin", { page: "Admin"}); });
    this.router.get("/admin/setup", async (req, res) => {
      const user: object = await Users.findOne({ role: 2 });

      if (!user) {
        res.render("admin", { page: "Admin"});
      } else {
        res.render("error", { page: "Admin"});
      }
    });
    this.router.get("/admin/:action", (req, res) => {
      const title = req.params.action.charAt(0).toUpperCase() + req.params.action.substr(1);
      
      res.render("admin", { page: `Tonap | Admin ${title}` });
    });
    this.router.get("/reklamacny-poriadok", (req, res) => {
      res.render("claim-conditions", { page: "Reklamačný poriadok - Tonap - Slovenský laboratórny materiál" });
    });
    this.router.get("/ochrana-osobnych-udajov", (req, res) => { res.render("gdpr", { page: `GDPR - Tonap - Slovenský laboratórny materiál` }); });
    this.router.get("/online-objednavka", (req, res) => {
      const { ordered } = req.query;
      const orderedParam = ordered === "true";

      res.render("online-order", {
        page: "Objednávky - Tonap - Slovenský laboratórny materiál",
        ordered: orderedParam,
      });
    });
    this.router.get("/obchodne-podmienky", (req, res) => {
      res.render("business-conditions", { page: "Obchodné podmienky - Tonap - Slovenský laboratórny materiál" });
    });

    this.io.on("connection", (socket) => {
      const admin = this.io.of("/admin");

      socket.on("order created", () => {
        admin.emit("order been created", { success: true });
      });
    });

    this.app.use("/api", ApiRouter);
    this.app.use(EmailRouter);
    this.app.use(UserRouter);
    this.app.use(OrderRouter);
    this.app.use(PaymentRouter);
    this.app.use(PaymentConfirmation);
    this.app.use(ProductRouter);
    this.app.use(this.router);
  }
}

export default new App().http;
