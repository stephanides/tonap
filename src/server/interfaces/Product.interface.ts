export interface IProduct {
  active?: boolean;
  category: number;
  description: string;
  // depth: number;
  height: string;
  gauge: string;
  imageFilesData: object[];
  // length: string;
  // notSterile: boolean;
  // notSterileProductMinCount: number;
  // notSterileProductMaxCount: number;
  // notSterileProductMinPackageCount: number;
  // notSterileProductMaxPackageCount: number;
  // sterile: boolean;
  // sterileProductMinCount: number;
  // sterileProductMaxCount: number;
  // sterileProductMinPackageCount: number;
  // sterileProductMaxPackageCount: number;
  title: string;
  variant: [object];
  // variantPriceMin?: [number];
  // variantPriceMed?: [number];
  // variantPriceMax?: [number];
  volume: string;
  weight: string;
  // wide: number;
}
