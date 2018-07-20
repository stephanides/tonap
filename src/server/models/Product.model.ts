import { Document, Schema, model } from "mongoose";
import { IProduct } from "../interfaces/Product.interface";

export class Product {
  public title: string;
  public description: string;
  public length: number;
  public wide: number;
  public depth: number;
  public weight: number;

  constructor(data: IProduct) {
    this.title = data.title;
    this.description = data.description;
    this.length = data.length;
    this.wide = data.wide;
    this.depth = data.depth;
    this.weight = data.weight;
  }
}

const ProductSchema = new Schema({
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  depth: Number,
  description: String,
  length: Number,
  title: {
    required: true,
    type: String,
    unique: true,
  },
  wide: Number,
  wight: Number,
});

export interface IProductDocument extends Product, Document {}

export const Products = model<IProductDocument>("Product", ProductSchema);
