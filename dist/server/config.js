"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongo: "mongodb://localhost:27017/carwellness",
    sadm: {
        email: "info@codebrothers.sk",
        firstName: "Code",
        lastName: "Brothers",
        password: "codeBrothers741",
    },
    saltRounds: 10,
    secret: "carWellnessAppSuperSecretEqualsToThisStringTwoPointsshhhhhssss",
};
exports.default = config;
