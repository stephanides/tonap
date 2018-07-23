import { Document, Schema, model } from "mongoose";
import { IProduct } from "../interfaces/Product.interface";

export class Product {
  public boxsize: number;
  public category: number;
  public depth: number;
  public description: string;
  public imageFilesData: object[];
  public length: number;
  public package: number;
  public title: string;
  public wide: number;
  public weight: number;

  constructor(data: IProduct) {
    this.boxsize = data.boxsize;
    this.category = data.category;
    this.description = data.description;
    this.imageFilesData = data.imageFilesData;
    this.depth = data.depth;
    this.length = data.length;
    this.package = data.package;
    this.title = data.title;
    this.wide = data.wide;
    this.weight = data.weight;
  }
}

const ProductSchema = new Schema({
  active: {
    default: true,
    type: Boolean,
  },
  boxsize: Number,
  category: Number,
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  depth: Number,
  description: String,
  imageFilesData: Array,
  length: Number,
  package: Number,
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
