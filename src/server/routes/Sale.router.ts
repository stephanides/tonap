import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { SaleController } from "../controllers/Sale.controller";

const router = express.Router();
const sale = new SaleController();

router.get("/sale", (req: Request, res: Response, next: NextFunction) => {
  sale.getAll(req, res, next);
});

export default router;
