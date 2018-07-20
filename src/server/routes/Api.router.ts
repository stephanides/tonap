import * as express from "express";
import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/Product.controller";
import { checkToken } from "./helpers/CheckToken.helper";

const router = express.Router();
const product = new ProductController();

router.post("/product/store", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    product.store(req, res, next);
  });
});

export default router;
