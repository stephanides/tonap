"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class User {
    constructor(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
        this.approved = data.approved;
    }
}
exports.User = User;
const UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: Number,
        default: 3
    },
    approved: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});
;
exports.Users = mongoose_1.model('User', UserSchema);
