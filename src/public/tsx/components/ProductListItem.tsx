import * as React from "react";

interface IProps {
  item?: object;
  keyI?: number;
  products?: object[];

  handleChangeProducts(products: object[], productNum: number): void;
  handleProductEdit(n: number | null): void;
  handleShowDeleteModal(productToDelete: number): void;
}

export default class ProductListItem extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      <div className="list-group-item d-flex justify-content-between" key={this.props.keyI}>
        <div>{(this.props.item as any).title}</div>
        <div className="row">
          <div className="col-4">
            <label className="switch">
              <input type="checkbox" checked={(this.props.item as any).active} onChange={(e) => {
                const products: object[] = this.props.products;

                (products[this.props.keyI] as any).active = (products[this.props.keyI] as any).active ? false : true;

                this.props.handleChangeProducts(products, this.props.keyI);
              }} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => { this.props.handleProductEdit(this.props.keyI); }}
            >Edit</button>
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-danger ml-2"
              onClick={() => {
                this.props.handleShowDeleteModal(this.props.keyI);
                // this.props.deleteProduct(i);
              }}
            >Delete</button>
          </div>
        </div>
      </div>
    );
  }
}
