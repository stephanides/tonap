import * as React from "react";

interface IProps {
  product?: object;
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
                const product: object = this.props.product;

                (product as any).title = e.currentTarget.value;
                this.props.handleProduct(product);
              }}
              value={this.props.product ? (this.props.product as any).title : ""}
              required />
          </div>
          <div className="col-6">
            <label className="sr-only" htmlFor="title">Kategória</label>
            <select className="custom-select form-control mb-2" id="category"
              defaultValue={this.props.product ? (this.props.product as any).category : 0}
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
              value={this.props.product ? (this.props.product as any).description : ""}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}
