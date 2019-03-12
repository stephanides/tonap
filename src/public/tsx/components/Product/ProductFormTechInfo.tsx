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
          <label className="sr-only" htmlFor="height">Výška</label>
          <input
            type="text"
            className="form-control mb-2" id="height" placeholder="Výška v mm"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.height = e.currentTarget.value; // parseInt(e.currentTarget.value, 10);
              this.props.handleProduct(product);
            }}
            value={
              this.props.product ?
              (
                this.props.product.height ?
                this.props.product.height : ""
              ) : ""
            }
            required />
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="gauge">Širka</label>
          <input
            type="text"
            className="form-control mb-2" id="gauge" placeholder="Priemer v mm"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.gauge = e.currentTarget.value; // parseInt(e.currentTarget.value, 10);
              this.props.handleProduct(product);
            }}
            value={this.props.product ?
              (
                this.props.product.gauge ?
                this.props.product.gauge : ""
              ) : ""}
            required />
        </div>
        {/*
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
          */}
        <div className="col-3">
          <label className="sr-only" htmlFor="volume">Objem</label>
          <input
            type="text"
            className="form-control mb-2" id="volume" placeholder="Objem v ml"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.volume = e.currentTarget.value; // parseInt(e.currentTarget.value, 10);
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
            type="text"
            className="form-control mb-2" id="weight" placeholder="Váha v g"
            onChange={(e) => {
              const product: IProduct = this.props.product;

              product.weight = e.currentTarget.value; // parseInt(e.currentTarget.value, 10);
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
