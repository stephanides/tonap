import * as React from "react";
import IProduct from "../../interfaces/Product.interface";

interface IProps {
  product?: IProduct;

  handleProduct(product: object): void;
}

export default class ProductFormTechInfo extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      <div className="form-row align-items-center form-group">
        <div className="col-12">
          <h6>Technické parametre</h6>
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="length">Dĺžka</label>
          <input
            type="number"
            className="form-control mb-2" id="length" placeholder="Dĺžka v mm" min="10" max="100"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.length = parseInt(e.currentTarget.value, 10);
              this.props.handleProduct(product);
            }}
            value={
              this.props.product ?
              (
                this.props.product.length ?
                this.props.product.length : ""
              ) : ""
            }
            required />
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="wide">Širka</label>
          <input
            type="number"
            className="form-control mb-2" id="wide" placeholder="Šír. v mm" min="10" max="100"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.wide = parseInt(e.currentTarget.value, 10);
              this.props.handleProduct(product);
            }}
            value={this.props.product ?
              (
                this.props.product.wide ?
                this.props.product.wide : ""
              ) : ""}
            required />
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="depth">Hĺbka</label>
          <input
            type="number"
            className="form-control mb-2" id="depth" placeholder="Hĺb. v mm" min="10" max="100"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.depth = parseInt(e.currentTarget.value, 10);
              this.props.handleProduct(product);
            }}
            value={
              this.props.product ?
              (
                this.props.product.depth ?
                this.props.product.depth : ""
              ) : ""
            }
            required/>
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="volume">Objem</label>
          <input
            type="number"
            className="form-control mb-2" id="volume" placeholder="Obj. v ml" min="0" max="1000"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.volume = parseInt(e.currentTarget.value, 10);
              this.props.handleProduct(product);
            }}
            value={
              this.props.product ?
              (
                this.props.product.volume ?
                this.props.product.volume : ""
              ) : ""
            }
            required />
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="weight">Váha</label>
          <input
            type="number"
            className="form-control mb-2" id="weight" placeholder="Váha v g" min="0" max="1000"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.weight = parseInt(e.currentTarget.value, 10);
              this.props.handleProduct(product);
            }}
            value={
              this.props.product ?
              (
                this.props.product.weight ?
                this.props.product.weight : ""
              ) : ""
            }
            required />
        </div>
      </div>
    );
  }
}
