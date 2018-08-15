import * as React from "react";
import _JSXStyle from "styled-jsx/style";
import { Link } from "react-router-dom";
import ProductEditModal from "./ProductEditModal";

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

  public componentWillMount() {
    //this.props.getProducts();
  }

  public render() {
    return(
      <div className="list-group mb-3">
        <div className="list-group-item bg-info d-flex justify-content-between">
          <div>
            <p className="text-light">
              { this.props.products && this.props.products.length > 0 ? "Názov produktu" : null }
            </p>
          </div>
          <div className="row">
            <div className="col-4">
              <p className="text-light">
                { this.props.products && this.props.products.length > 0 ? "Aktívny" : null }
              </p>
            </div>
            <div className="col-3"><button className="invisible btn btn-primary">Edit</button></div>
            <div className="col-3"><button className="invisible btn btn-primary">Delete</button></div>
          </div>
        </div>
        {
          this.props.products && this.props.products.length > 0 ?
          this.props.products.map((item, i) => {
            return(
              <div className="list-group-item d-flex justify-content-between" key={i}>
                <div>{(item as any).title}</div>
                <div className="row">
                  <div className="col-4">
                    <label className="switch">
                      <input type="checkbox" checked={(item as any).active} onChange={(e) => {
                        const products: object[] = this.props.products;

                        (products[i] as any).active = (products[i] as any).active ? false : true;

                        this.props.handleChangeProducts(products, i);
                      }} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="col-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => { this.props.handleProductEdit(i); }}
                    >Edit</button>
                  </div>
                  <div className="col-3">
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={() => {
                        this.props.handleShowDeleteModal(i);
                        // this.props.deleteProduct(i);
                      }}
                    >Delete</button>
                  </div>
                </div>
              </div>
            );
          }) :
          <div className="list-group-item text-center">
            <p>Neboli nájdené žiadne produkty, <Link to="/admin/product-insert">pridaj</Link> nejaké.</p>
          </div>
        }

        <_JSXStyle styled={"switch"} css={`
          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
          }
          .switch input {display:none;}
          .switch .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
          .switch .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          .switch input:checked + .slider {
            background-color: #2196F3;
          }
          .switch input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
          }
          .switch input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }
          /* Rounded sliders */
          .switch .slider.round {
            border-radius: 34px;
          }
          .switch .slider.round:before {
            border-radius: 50%;
          }
        `} />
      </div>
    );
  }
}
