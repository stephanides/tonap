import * as express from "express";
import { Request, Response, NextFunction } from "express";
import PaymentController from "../controllers/Payment.controller";

const router = express.Router();
const order = new PaymentController();

router.post("/payment", (req: Request, res: Response, next: NextFunction) => {
  order.manage(req, res, next);
});

export default router;
