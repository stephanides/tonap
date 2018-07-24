import * as express from "express";
import { Request, Response, NextFunction } from "express";
import ProductController from "../controllers/Product.controller";
import { checkToken } from "./helpers/CheckToken.helper";

const router = express.Router();
const product = new ProductController();

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

export default router;
