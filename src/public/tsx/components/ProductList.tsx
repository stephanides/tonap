import * as React from "react";
import _JSXStyle from "styled-jsx/style";
import { Link } from "react-router-dom";
import ProductEditModal from "./ProductEditModal";
import ProductListItem from "./ProductListItem";

interface IProps {
  products?: object[];

  deleteProduct(i: number): Promise<void>;
  getProducts(): Promise<void>;
  handleChangeProducts(products: object[], productNum: number): void;
  handleProductEdit(n: number | null): void;
  handleShowDeleteModal(productToDelete: number): void;
}

export default class ProductList extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      <div>
        <h2>Zoznam produktov</h2>
        {
          this.props.products && this.props.products.length > 0 ?
          [
            <div key={0} className="list-group-item bg-info d-flex justify-content-between">
              <div>
                <p className="text-light">Názov produktu</p>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-light">Aktívny</p>
                </div>
                <div className="col-3"><button className="invisible btn btn-primary">Edit</button></div>
                <div className="col-3"><button className="invisible btn btn-primary">Delete</button></div>
              </div>
            </div>,
            this.props.products.map((item, i) => (
              <ProductListItem
                products={this.props.products}
                item={item}
                keyI={i}

                handleChangeProducts={this.props.handleChangeProducts}
                handleProductEdit={this.props.handleProductEdit}
                handleShowDeleteModal={this.props.handleShowDeleteModal}
                key={i}
              />
            )),
           ] :
          <div className="list-group-item text-center">
            <p>Neboli nájdené žiadne produkty, <Link to="/admin/product-insert">pridaj</Link> nejaké.</p>
          </div>
        }
      </div>
    );
  }
}
