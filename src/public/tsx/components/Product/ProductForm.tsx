import * as React from "react";

import ProductFormBasicInfo from "./ProductFormBasicInfo";
import ProductFormTechInfo from "./ProductFormTechInfo";
import ProductFormSterilityInfo from "./ProductFormSterilityInfo";
import IProduct from "../../interfaces/Product.interface";

interface IProps {
  product?: IProduct;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;

  handleProductUpdate?: (e: React.FormEvent<HTMLElement>) => Promise<void>;
  handleProduct(product: object): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

export default class ProductForm extends React.Component<IProps, {}> {
  public render() {
    return(
      <form onSubmit={(e) => {
        if (this.props.productEdit) {
          this.props.handleProductUpdate(e);
        } else {
          this.props.storeProduct(e);
        }
      }}>
        <ProductFormBasicInfo
          product={this.props.product}
          products={this.props.products}
          productNumber={this.props.productNumber}
          handleProduct={this.props.handleProduct}
        />
        <ProductFormTechInfo
          product={this.props.product}
          handleProduct={this.props.handleProduct}
        />
        <ProductFormSterilityInfo
          product={this.props.product}
          handleProduct={this.props.handleProduct}
        />
        <div className="form-row align-items-center">
          <div className="col-12">
            <button type="submit" className="btn btn-primary mb-2">
              {
                this.props.productEdit ? "Upraviť produkt" : "Pridať produkt"
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}
