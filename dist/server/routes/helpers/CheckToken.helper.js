"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const jwt = require("jsonwebtoken");
exports.checkToken = (req, res, next, callBack) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        const error = new Error("No token provided");
        error.status = 499;
        return next(error);
    }
    else {
        jwt.verify(token, config_1.default.secret, (err, decoded) => {
            if (err) {
                const error = new Error("Provided token is invalid");
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
