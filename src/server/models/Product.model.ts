import { Document, Schema, model } from "mongoose";
import { IProduct } from "../interfaces/Product.interface";

export class Product {
  public active: boolean;
  public boxsize: number;
  public category: number;
  // public depth: number;
  public description: string;
  public height: string;
  public gauge: string;
  public imageFilesData: object[];
  // public length: string;
  // public notSterile: boolean;
  // public notSterileProductMinCount: number;
  // public notSterileProductMaxCount: number;
  // public notSterileProductMinPackageCount: number;
  // public notSterileProductMaxPackageCount: number;
  // public sterile: boolean;
  // public sterileProductMinCount: number;
  // public sterileProductMaxCount: number;
  // public sterileProductMinPackageCount: number;
  // public sterileProductMaxPackageCount: number;
  public variant: [object];
  // public variantPriceMin: [number];
  // public variantPriceMed: [number];
  // public variantPriceMax: [number];
  public title: string;
  public volume: string;
  // public wide: number;
  public weight: string;

  constructor(data: IProduct) {
    this.active = data.active;
    this.category = data.category;
    this.description = data.description;
    this.height = data.height;
    this.gauge = data.gauge;
    this.imageFilesData = data.imageFilesData;
    // this.depth = data.depth;
    // this.length = data.length;
    // this.notSterile = data.notSterile;
    // this.notSterileProductMinCount = data.notSterileProductMinCount;
    // this.notSterileProductMaxCount = data.notSterileProductMaxCount;
    // this.notSterileProductMinPackageCount = data.notSterileProductMinPackageCount;
    // this.notSterileProductMaxPackageCount = data.notSterileProductMaxPackageCount;
    // this.sterile = data.sterile;
    // this.sterileProductMinCount = data.sterileProductMinCount;
    // this.sterileProductMaxCount = data.sterileProductMaxCount;
    // this.sterileProductMinPackageCount = data.sterileProductMinPackageCount;
    // this.sterileProductMaxPackageCount = data.sterileProductMaxPackageCount;
    this.title = data.title;
    this.variant = data.variant;
    // this.variantPriceMin = data.variantPriceMin;
    // this.variantPriceMed = data.variantPriceMed;
    // this.variantPriceMax = data.variantPriceMax;
    this.volume = data.volume;
    // this.wide = data.wide;
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
  // depth: Number,
  description: String,
  height: String,
  gauge: String,
  imageFilesData: Array,
  // length: String,
  // notSterile: Boolean,
  // notSterileProductMaxCount: Number,
  // notSterileProductMaxPackageCount: Number,
  // notSterileProductMinCount: Number,
  // notSterileProductMinPackageCount: Number,
  // sterile: Boolean,
  // sterileProductMaxCount: Number,
  // sterileProductMaxPackageCount: Number,
  // sterileProductMinCount: Number,
  // sterileProductMinPackageCount: Number,
  title: {
    required: true,
    type: String,
    unique: true,
  },
  variant: Array,
  volume: String,
  weight: String,
  // wide: Number,
});

export interface IProductDocument extends Product, Document {}

export const Products = model<IProductDocument>("Product", ProductSchema);
