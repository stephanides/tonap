import { Document, Schema, model } from "mongoose";
import IOrder from "../interfaces/Order.interface";

export class Order {
  public city: string;
  public company?: string;
  public email: string;
  public ico?: number;
  public name: string;
  public orderNum: number;
  // public surname: string;
  public street: string;
  public products: object[];

  constructor(data: IOrder) {
    this.city = data.city;
    this.company = data.company;
    this.email = data.email;
    this.ico = data.ico;
    this.name = data.name;
    this.orderNum = data.orderNum;
    // this.surname = data.surname;
    this.street = data.street;
    this.products = data.products;
  }
}

const OrderSchema = new Schema({
  city: String,
  company: String,
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  email: String,
  ico: Number,
  name: String,
  orderNum: Number,
  products: Array,
  state: {
    default: 0,
    type: Number
  },
  street: String,
  // surname: String,
});

export interface IOrderDocument extends Order, Document {}

export const Orders = model<IOrderDocument>("Order", OrderSchema);
