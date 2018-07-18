import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/User.controller";
import { checkToken } from "./helpers/CheckToken.helper";
// import { NextFunction } from "connect";

const router = express.Router();
const user = new UserController();

/*router.get("/user/users", (req, res, next) => {
  user.getUsers(req, res, next);
})*/

router.post("/user/login", (req: Request, res: Response, next: NextFunction) => {
  user.login(req, res, next);
});

/*router.post("/user/register", (req, res, next) => {
  user.register(req, res, next);
});*/

router.put("/user/user/:id", (req: Request, res: Response, next: NextFunction) => {
  checkToken(req, res, next, () => {
    user.updateUser(req, res, next);
  });
});

export default router;
