import * as express from "express";
import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/Product.controller";

const router = express.Router();
const product = new ProductController();

router.get("/product/get/list", (req: Request, res: Response, next: NextFunction) => {
  product.get(req, res, next);
});

export default router;
