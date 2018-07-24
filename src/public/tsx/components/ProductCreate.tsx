import * as React from "react";
import IFile from "../interfaces/File.interface";
import ProductForm from "./ProductForm";
import ProductImageDropzone from "./ProductImageDropZone";

interface IProps {
  imageFiles?: IFile[];
  imageNum?: number;

  imageDrop(files: File[]): void;
  imagePreviewSelect(n: number): void;
  imageRemoveSelect(n: number): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

export default class ProductCreate extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return[
      <h2 className="mb-3" key={0}>Produkty</h2>,
      <h5 key={1}>Vložiť produkt</h5>,
      <div className="row" key={2}>
        <div className="col-8 mb-3">
          <ProductForm storeProduct={this.props.storeProduct} />
        </div>
        <div className="col-4 mb-3">
          <ProductImageDropzone
            imageFiles={this.props.imageFiles}
            imageNum={this.props.imageNum}

            imageDrop={this.props.imageDrop}
            imagePreviewSelect={this.props.imagePreviewSelect}
            imageRemoveSelect={this.props.imageRemoveSelect}
          />
        </div>
      </div>,
    ];
  }
}
