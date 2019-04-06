export default interface IProduct {
  category: number;
  // depth: number;
  description: string;
  height: string; // number;
  gauge: string; // number;
  // length: number;
  // notSterile: boolean;
  // notSterileProductMinCount: number;
  // notSterileProductMinPackageCount: number;
  // notSterileProductMaxCount: number;
  // notSterileProductMaxPackageCount: number;
  // sterile: boolean;
  // sterileProductMaxCount: number;
  // sterileProductMaxPackageCount: number;
  // sterileProductMinCount: number;
  // sterileProductMinPackageCount: number;
  title: string;
  volume: string; // number;
  variant?: [IVariant];
  weight: string; // number;
  // wide: number;
}

interface IVariant {
  title?: string;
  priceMin?: string;
  priceMed?: string;
  priceMax?: string;
  boxCount?: string;
  sackCount?: string;
  inStock?: boolean;
}
