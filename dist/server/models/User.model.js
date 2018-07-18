"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class User {
    /*
    {
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      role?: number,
      approved?: boolean,
    }
    */
    constructor(data) {
        this.approved = data.approved;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.password = data.password;
        this.role = data.role;
    }
}
exports.User = User;
const UserSchema = new mongoose_1.Schema({
    approved: {
        default: false,
        type: Boolean,
    },
    dateCreated: {
        default: Date.now(),
        type: Date,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    firstName: String,
    lastName: String,
    password: String,
    role: {
        default: 3,
        type: Number,
    },
});
exports.Users = mongoose_1.model("User", UserSchema);
