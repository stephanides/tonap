import * as express from "express";
import { Request, Response, NextFunction } from "express";
import OrderController from "../controllers/Order.controller";
import ProductController from "../controllers/Product.controller";
import { SaleController } from "../controllers/Sale.controller";
import { checkToken } from "./helpers/CheckToken.helper";

const router = express.Router();
const order = new OrderController();
const product = new ProductController();
const sale = new SaleController();

router.post("/order/state", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    order.handleEmailNotification(req, res, next);
  });
});

router.get("/order", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    order.getAll(req, res, next);
  });
});

router.delete("/product/:id", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    product.delete(req, res, next);
  });
});

router.get("/product", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    product.getAll(req, res, next);
  });
});

router.post("/product", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    product.store(req, res, next);
  });
});

router.put("/product", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    product.update(req, res, next);
  });
});

router.post("/sale", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    sale.create(req, res, next);
  });
});

router.delete("/sale", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    sale.remove(req, res, next);
  });
});

export default router;
