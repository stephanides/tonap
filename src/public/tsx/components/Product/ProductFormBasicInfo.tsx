import * as React from "react";
import IProduct from "../../interfaces/Product.interface";
import { stringify } from "querystring";

interface IProps {
  product?: IProduct;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;

  handleProduct(product: object): void;
}

export default class ProductFormBasicInfo extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      <div>
        <div className="form-row align-items-center">
          <div className="col-12">
            <h6>Základné informácie</h6>
          </div>
          <div className="col-6">
            <label className="sr-only" htmlFor="title">Názov Produktu</label>
            <input
              type="text"
              className="form-control mb-2"
              id="title"
              placeholder="Názov Produktu"
              onChange={(e) => {
                const product: IProduct = this.props.product;

                product.title = e.currentTarget.value;
                this.props.handleProduct(product);
              }}
              value={
                this.props.product ?
                (
                  this.props.product.title ?
                  this.props.product.title : ""
                ) : ""
              }
              required />
          </div>
          <div className="col-6">
            <label className="sr-only" htmlFor="title">Kategória</label>
            <select className="custom-select form-control mb-2" id="category"
              defaultValue={this.props.product ? String(this.props.product.category) : "0"}
              onChange={(e) => {
              const product: object = this.props.product;

              (product as any).category = e.currentTarget.selectedIndex;
              this.props.handleProduct(product);
            }}>
              <option value={0}>Kategórie</option>
              <option value={1}>Masťovky a Kelímky</option>
              <option value={2}>Petriho misky a odberníky</option>
              <option value={3}>Skúmavky</option>
            </select>
          </div>
        </div>
        <div className="form-row form-group">
          <div className="col-12">
            <label className="sr-only" htmlFor="description">Stručné Info.</label>
            <textarea
              className="form-control mb-2"
              id="description"
              onChange={(e) => {
                const product: object = this.props.product;

                (product as any).description = e.currentTarget.value;
                this.props.handleProduct(product);
              }}
              placeholder="Stručné Info."
              value={
                this.props.product ?
                (
                  this.props.product.description ?
                  this.props.product.description : ""
                ) : ""
              }
              required
            />
          </div>
        </div>
      </div>
    );
  }
}
