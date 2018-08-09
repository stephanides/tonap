import { Document, Schema, model } from "mongoose";
import { IProduct } from "../interfaces/Product.interface";

export class Product {
  public active: boolean;
  public boxsize: number;
  public category: number;
  public depth: number;
  public description: string;
  public imageFilesData: object[];
  public length: number;
  public notSterile: boolean;
  public notSterileProductMinCount: number;
  public notSterileProductMaxCount: number;
  public notSterileProductMinPackageCount: number;
  public notSterileProductMaxPackageCount: number;
  public sterile: boolean;
  public sterileProductMinCount: number;
  public sterileProductMaxCount: number;
  public sterileProductMinPackageCount: number;
  public sterileProductMaxPackageCount: number;
  public title: string;
  public volume: number;
  public wide: number;
  public weight: number;

  constructor(data: IProduct) {
    this.active = data.active;
    this.category = data.category;
    this.description = data.description;
    this.imageFilesData = data.imageFilesData;
    this.depth = data.depth;
    this.length = data.length;
    this.notSterile = data.notSterile;
    this.notSterileProductMinCount = data.notSterileProductMinCount;
    this.notSterileProductMaxCount = data.notSterileProductMaxCount;
    this.notSterileProductMinPackageCount = data.notSterileProductMinPackageCount;
    this.notSterileProductMaxPackageCount = data.notSterileProductMaxPackageCount;
    this.sterile = data.sterile;
    this.sterileProductMinCount = data.sterileProductMinCount;
    this.sterileProductMaxCount = data.sterileProductMaxCount;
    this.sterileProductMinPackageCount = data.sterileProductMinPackageCount;
    this.sterileProductMaxPackageCount = data.sterileProductMaxPackageCount;
    this.title = data.title;
    this.volume = data.volume;
    this.wide = data.wide;
    this.weight = data.weight;
  }
}

const ProductSchema = new Schema({
  active: {
    default: true,
    type: Boolean,
  },
  category: Number,
  dateCreated: {
    default: Date.now(),
    type: Date,
  },
  depth: Number,
  description: String,
  imageFilesData: Array,
  length: Number,
  notSterile: Boolean,
  notSterileProductMaxCount: Number,
  notSterileProductMaxPackageCount: Number,
  notSterileProductMinCount: Number,
  notSterileProductMinPackageCount: Number,
  sterile: Boolean,
  sterileProductMaxCount: Number,
  sterileProductMaxPackageCount: Number,
  sterileProductMinCount: Number,
  sterileProductMinPackageCount: Number,
  title: {
    required: true,
    type: String,
    unique: true,
  },
  volume: Number,
  weight: Number,
  wide: Number,
});

export interface IProductDocument extends Product, Document {}

export const Products = model<IProductDocument>("Product", ProductSchema);