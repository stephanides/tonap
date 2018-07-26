import * as React from "react";

import ProductFormBasicInfo from "./ProductFormBasicInfo";
import ProductFormTechInfo from "./ProductFormTechInfo";
import ProductFormSterilityInfo from "./ProductFormSterilityInfo";

interface IProps {
  product?: object;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;

  handleProduct(product: object): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

export default class ProductForm extends React.Component<IProps, {}> {
  public render() {
    return(
      <form onSubmit={(e) => { this.props.storeProduct(e); }}>
        <ProductFormBasicInfo
          product={this.props.product}
          products={this.props.products}
          productNumber={this.props.productNumber}
          handleProduct={this.props.handleProduct}
        />
        <ProductFormTechInfo />
        <ProductFormSterilityInfo />
        <div className="form-row align-items-center">
          <div className="col-12">
            <button type="submit" className="btn btn-primary mb-2">Pridať produkt</button>
          </div>
        </div>
      </form>
    );
  }
}
