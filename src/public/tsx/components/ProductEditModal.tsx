import * as React from "react";
import _JSXStyle from "styled-jsx/style";
import ProductForm from "./ProductForm";

interface IProps {
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;

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
        <div className="pe-bg"></div>
        <div className="modal-wrapper col-6 ml-auto mr-auto mt-5 p-0">
          <div className="header p-3">
            <h5>Upraviť produkt: </h5>
          </div>
          <div className="body p-3">
            <ProductForm
              products={this.props.products}
              productEdit={this.props.productEdit}
              productNumber={this.props.productNumber}
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
        `} />
      </div> : null
    );
  }
}
