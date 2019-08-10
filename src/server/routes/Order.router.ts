import * as express from "express";
import { Request, Response, NextFunction } from "express";
import OrderController from "../controllers/Order.controller";

const router = express.Router();
const order = new OrderController();

router.post("/order", (req: Request, res: Response, next: NextFunction) => {
  console.log('IN A ROUTE');
  order.create(req, res, next);
});

export default router;
