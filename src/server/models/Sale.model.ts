import { Document, Schema, model } from "mongoose";
import ISale from "../interfaces/Sale.interface";

export class Sale {
  public saleCode?: string;
  public sale?: number;

  constructor(data: ISale) {
    this.saleCode = data.saleCode;
    this.sale = data.sale;
  }
}

const Salechema = new Schema({
  saleCode: String,
  sale: Number
});

export interface ISaleDocument extends Sale, Document {};

export const Sales = model<ISaleDocument>("Sale", Salechema);
