import { Document, Schema, model } from "mongoose";
import IOrder from "../interfaces/Order.interface";

export class Order {
  // public city: string;
  public billingAddress?: object;
  // public cancellation?: boolean;
  public company?: string;
  public dateModified?: string;
  public deliveryAddress?: object;
  public deliveryTime?: number;
  public email: string;
  public ico?: number;
  public message?: string;
  public name: string;
  public orderNum: number;
  public state: number;
  // public street: string;
  public phone: string;
  // public psc: string;
  public products: object[];

  constructor(data: IOrder) {
    // this.city = data.city;
    this.billingAddress = data.billingAddress;
    // this.cancellation = data.cancellation;
    this.company = data.company;
    this.dateModified = data.dateModified;
    this.deliveryAddress = data.deliveryAddress;
    this.deliveryTime = data.deliveryTime;
    this.email = data.email;
    this.ico = data.ico;
    this.message = data.message;
    this.name = data.name;
    this.orderNum = data.orderNum;
    this.state = data.state;
    // this.street = data.street;
    this.phone = data.phone;
    // this.psc = data.psc;
    this.products = data.products;
  }
}

const OrderSchema = new Schema({
  billingAddress: Object,
  // city: String,
  /*cancellation: {
    default: false,
    type: Boolean,
  },*/
  company: String,
  dateModified: Date,
  deliveryAddress: Object,
  deliveryTime: {
    default: 0,
    type: Number,
  },
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  email: String,
  ico: Number,
  message: String,
  name: String,
  orderNum: Number,
  phone: String,
  // psc: String,
  products: Array,
  state: {
    default: 0,
    type: Number
  },
  // street: String,
  // surname: String,
});

export interface IOrderDocument extends Order, Document {}

export const Orders = model<IOrderDocument>("Order", OrderSchema);
