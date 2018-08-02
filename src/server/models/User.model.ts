import { Document, Schema, model } from "mongoose";
import { IUser } from "../interfaces/User.interface";

export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role: number;
  public approved: boolean;

  constructor(data: IUser) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
    this.role = data.role;
  }
}

const UserSchema = new Schema({
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

export interface IUserDocument extends User, Document {}

export const Users = model<IUserDocument>("User", UserSchema);
