import config from "../../config";
import * as jwt from "jsonwebtoken";
import IError from "../../interfaces/Error.inerface";

export const checkToken = (req, res, next, callBack?: (next) => void) => {
  const token: string = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    const error: IError = new Error("No token provided");

    error.status = 499;
    return next(error);
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        const error: IError = new Error("Provided token is invalid");

        error.status = 498;
        return next(err);
      }

      req.decoded = decoded;

      if (typeof callBack === "function") {
        callBack(next);
      }
    });
  }
};
