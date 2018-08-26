import * as React from "react";
import IProduct from "../../interfaces/Product.interface";

interface IProps {
  product?: IProduct;

  handleProduct(product: object): void;
}
export default class ProductFormSterilityInfo extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
        <div className="form-row align-items-center form-group" ref={"sterileWrapper"}>
          <div className="col-12">
            <h6>Sterilita</h6>
          </div>
          <div className="col-12">
            <div className="row form-group">
              <div className="col-auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => {
                      const product: IProduct = this.props.product;

                      product.sterile = e.currentTarget.checked;
                      this.props.handleProduct(product);
                    }}
                    checked={this.props.product ? this.props.product.sterile : false}
                    id="sterile" />
                  <label className="form-check-label" htmlFor="sterile">Sterilné</label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox" value={1} id="notSterile"
                    onChange={(e) => {
                      const product: IProduct = this.props.product;

                      product.notSterile = e.currentTarget.checked;
                      this.props.handleProduct(product);
                    }}
                    checked={this.props.product ? this.props.product.notSterile : false}
                    />
                  <label className="form-check-label" htmlFor="notSterile">Nesterilné</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6" ref={"sterile"}>
            <h6>Počet ks. sterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMinCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMinCount" placeholder="Min." min="1" max="1000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.sterileProductMinCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.sterile ?
                      false : true
                    ) : true
                  }
                  value={
                    this.props.product ?
                    (
                    this.props.product.sterileProductMinCount ? this.props.product.sterileProductMinCount : ""
                    ) : ""
                  }
                />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMaxCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMaxCount" placeholder="Max." min="1" max="2000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.sterileProductMaxCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.sterile ?
                      false : true
                    ) : true
                  }
                  value={this.props.product ?
                    (
                      this.props.product.sterileProductMaxCount ?
                      this.props.product.sterileProductMaxCount : ""
                    ) : ""}
                />
              </div>
            </div>
            <h6>Balenie sterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMinPackageCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMinPackageCount" placeholder="Min." min="1" max="1000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.sterileProductMinPackageCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.sterile ?
                      false : true
                    ) : true
                  }
                  value={
                    this.props.product ?
                    (
                      this.props.product.sterileProductMinPackageCount ?
                      this.props.product.sterileProductMinPackageCount : ""
                    ) : ""
                  }
                />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMaxPackageCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMaxPackageCount" placeholder="Max." min="1" max="10000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.sterileProductMaxPackageCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.sterile ?
                      false : true
                    ) : true
                  }
                  value={
                    this.props.product ?
                    (
                      this.props.product.sterileProductMaxPackageCount ?
                      this.props.product.sterileProductMaxPackageCount : ""
                    ) : ""
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-6" ref={"notSterile"}>
            <h6>Počet ks. nesterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMinCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMinCount" placeholder="Min." min="1" max="1000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.notSterileProductMinCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.notSterile ?
                      false : true
                    ) : true
                  }
                  value={
                    this.props.product ?
                    (
                      this.props.product.notSterileProductMinCount ?
                      this.props.product.notSterileProductMinCount : ""
                    ) : ""
                  }
                />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMaxCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMaxCount" placeholder="Max." min="1" max="2000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.notSterileProductMaxCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.notSterile ?
                      false : true
                    ) : true
                  }
                  value={
                    this.props.product ?
                    (
                      this.props.product.notSterileProductMaxCount ?
                      this.props.product.notSterileProductMaxCount : ""
                    ) : ""
                  }
                />
              </div>
            </div>
            <h6>Balenie nesterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMinPackageCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMinPackageCount" placeholder="Min." min="1" max="1000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.notSterileProductMinPackageCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.notSterile ?
                      false : true
                    ) : true
                  }
                  value={this.props.product ? this.props.product.notSterileProductMinPackageCount : ""}
                />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMaxPackageCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMaxPackageCount" placeholder="Max." min="1" max="10000" required
                  onChange={(e) => {
                    const product: IProduct = this.props.product;

                    product.notSterileProductMaxPackageCount = parseInt(e.currentTarget.value, 10);
                    this.props.handleProduct(product);
                  }}
                  disabled={
                    this.props.product ? (
                      this.props.product.notSterile ?
                      false : true
                    ) : true
                  }
                  value={
                    this.props.product ?
                    (
                      this.props.product.notSterileProductMaxPackageCount ?
                      this.props.product.notSterileProductMaxPackageCount : ""
                    ) : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
    );
  }
}
