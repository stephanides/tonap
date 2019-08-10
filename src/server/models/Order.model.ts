import { Document, Schema, model } from "mongoose";
import IOrder, { ISale } from "../interfaces/Order.interface";

export class Order {
  // public city: string;
  public billingAddress?: object;
  // public cancellation?: boolean;
  public company?: string;
  public dateModified?: string;
  public deliveryAddress?: object;
  public deliveryTime?: number;
  public dic?: number;
  public email: string;
  public fullPrice?: number;
  public ico?: number;
  public location?: string;
  public message?: string;
  public name: string;
  public nettPrice: number;
  public orderNum: number;
  public paymentMethod?: number;
  public paymenthPrice?: number;
  public surname: string;
  public state: number;
  public shippingMethod?: number;
  public shippingPrice?: number;
  // public street: string;
  public phone: string;
  // public psc: string;
  public products: object[];
  public sale: ISale;

  constructor(data: IOrder) {
    // this.city = data.city;
    this.billingAddress = data.billingAddress;
    // this.cancellation = data.cancellation;
    this.company = data.company;
    this.dateModified = data.dateModified;
    this.deliveryAddress = data.deliveryAddress;
    this.deliveryTime = data.deliveryTime;
    this.dic = data.dic;
    this.email = data.email;
    this.fullPrice = data.fullPrice;
    this.ico = data.ico;
    this.location = data.location;
    this.message = data.message;
    this.name = data.name;
    this.nettPrice = data.nettPrice;
    this.orderNum = data.orderNum;
    this.paymentMethod = data.paymentMethod;
    this.paymenthPrice = data.paymenthPrice;
    this.state = data.state;
    this.shippingMethod = data.shippingMethod;
    this.shippingPrice = data.shippingPrice;
    this.surname = data.surname;
    // this.street = data.street;
    this.phone = data.phone;
    // this.psc = data.psc;
    this.products = data.products;
    this.sale = data.sale;
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
  dic: Number,
  email: String,
  fullPrice: Number,
  ico: Number,
  location: String,
  message: String,
  name: String,
  nettPrice: Number,
  orderNum: Number,
  paymentMethod: Number,
  paymenthPrice: Number,
  phone: String,
  // psc: String,
  products: Array,
  state: {
    default: 0,
    type: Number
  },
  surname: String,
  // street: String,
  // surname: String,
  sale: Object,
});

export interface IOrderDocument extends Order, Document {}

export const Orders = model<IOrderDocument>("Order", OrderSchema);
