import * as React from "react";
import _JSXStyle from "styled-jsx/style";
import ProductForm from "./ProductForm";

interface IProps {
  product?: object;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;

  handleProduct(product: object): void;
  handleProductEdit(n: number | null): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

export default class ProductEdit extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      this.props.productEdit && this.props.productEdit ?
      <div className="productEditWrapper" role="dialog">
        <div className="pe-bg" onClick={() => { this.props.handleProductEdit(null); }}></div>
        <div className="modal-wrapper col-6 ml-auto mr-auto mt-5 p-0">
          <div className="header p-3 position-relative">
            <h5>Upraviť produkt: </h5>
            <button className="close-modal" onClick={() => { this.props.handleProductEdit(null); }}>&times;</button>
          </div>
          <div className="body p-3">
            <ProductForm
              product={this.props.product}
              products={this.props.products}
              productEdit={this.props.productEdit}
              productNumber={this.props.productNumber}
              handleProduct={this.props.handleProduct}
              storeProduct={this.props.storeProduct}
            />
          </div>
          <div className="footer p-3"></div>
        </div>

        <_JSXStyle styleId={"productEditWrapper"} css={`
          .productEditWrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1050;
          }
          .productEditWrapper .pe-bg {
            background-color: rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .productEditWrapper .modal-wrapper {
            background-color: #fff;
            border-radius: .5rem;
          }
          .productEditWrapper .modal-wrapper .header {
            border-bottom: 1px solid #e9ecef;
          }
          .productEditWrapper .modal-wrapper .header .close-modal {
            background-color: transparent;
            border: 0;
            position: absolute;
            top: 1rem;
            right: 1rem;
          }
        `} />
      </div> : null
    );
  }
}
