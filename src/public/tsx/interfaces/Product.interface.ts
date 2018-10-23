export default interface IProduct {
  category: number;
  // depth: number;
  description: string;
  height: number;
  gauge: number;
  // length: number;
  notSterile: boolean;
  notSterileProductMinCount: number;
  notSterileProductMinPackageCount: number;
  notSterileProductMaxCount: number;
  notSterileProductMaxPackageCount: number;
  sterile: boolean;
  sterileProductMaxCount: number;
  sterileProductMaxPackageCount: number;
  sterileProductMinCount: number;
  sterileProductMinPackageCount: number;
  title: string;
  volume: number;
  weight: number;
  // wide: number;
}
