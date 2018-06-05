"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const jwt = require("jsonwebtoken");
exports.checkToken = (req, res, next, callBack) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        const err = new Error('No token provided');
        err['status'] = 499;
        return next(err);
    }
    else {
        jwt.verify(token, config_1.default.secret, (err, decoded) => {
            if (err) {
                const err = new Error('Provided token is invalid');
                err['status'] = 498;
                return next(err);
            }
            req['decoded'] = decoded;
            if (typeof callBack === 'function') {
                callBack(next);
            }
        });
    }
};
