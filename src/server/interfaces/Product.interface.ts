export interface IProduct {
  active?: boolean;
  category: number;
  description: string;
  depth: number;
  imageFilesData: object[];
  length: number;
  notSterile: boolean;
  notSterileProductMinCount: number;
  notSterileProductMaxCount: number;
  notSterileProductMinPackageCount: number;
  notSterileProductMaxPackageCount: number;
  sterile: boolean;
  sterileProductMinCount: number;
  sterileProductMaxCount: number;
  sterileProductMinPackageCount: number;
  sterileProductMaxPackageCount: number;
  title: string;
  volume: number;
  weight: number;
  wide: number;
}
