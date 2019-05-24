import * as express from "express";
import { Request, Response, NextFunction } from "express";
import PaymentConfirmationController from "../controllers/PaymentConfirmation.controller";

const router = express.Router();
const paymentConfirmation = new PaymentConfirmationController();

router.get("/potvrdenie-platby", (req: Request, res: Response, next: NextFunction) => {
  paymentConfirmation.manage(req, res, next);
});

export default router;
