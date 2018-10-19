import * as React from "react";
// import _JSXStyle from "styled-jsx/style";
import { Link } from "react-router-dom";
// import ProductEditModal from "./ProductEditModal";
import ProductListItem from "./ProductListItem";
import Pagination from "./Pagination";

interface IProps {
  products?: object[];
  pageData?: object[];
  page?: number;
  pagesCount?: number;

  deleteProduct(i: number): Promise<void>;
  getProducts(): Promise<void>;
  handleChangePage(page: number): void;
  handleChangeProducts(products: object[], productNum: number): void;
  handleProductEdit(n: number | null): void;
  handleShowDeleteModal(productToDelete: number): void;
}

export default class ProductList extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.getProducts();
  }

  public render() {
    return(
      <div>
        <h2>Zoznam produktov</h2>
        {
          this.props.pageData ?
          (
            this.props.pageData.length > 0 ?
            [
              <table className="table table-striped mb-5" key={1}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Názov produktu</th>
                    <th scope="col">Aktívny</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.pageData.map((item, i) => {
                      const activity: boolean = (item as any).active;
                      return (
                        <tr key={i}>
                          <td scope="row">{i+1}</td>
                          <td>{(item as any).title}</td>
                          <td>{
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={activity || false}
                                onChange={(e) => {
                                  const products: object[] = this.props.pageData;
                                  const product: any = products[i] as object;

                                  product.active = product.active ? false : true;
                  
                                  this.props.handleChangeProducts(this.props.pageData, i);
                                }}
                              />
                              <span className="slider round"></span>
                            </label>
                          }</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => this.props.handleProductEdit(i)}
                            >Edit</button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger ml-2"
                              onClick={() => this.props.handleShowDeleteModal(i)}
                            >Delete</button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>,
              <Pagination
                handleChangePage={this.props.handleChangePage}
                page={this.props.page}
                pagesCount={this.props.pagesCount}
                key={2}
              />
            ] :
            <div className="list-group-item text-center">
              <p>Neboli nájdené žiadne produkty, <Link to="/admin/product-insert">pridaj</Link> nejaké.</p>
            </div>
          ) : (
            <div className="w-100 d-flex justify-content-center mt-3">
              <img src="../assets/images/icons/loading.gif" width="50" height="50" />
            </div>
          )
        }
      </div>
    );
  }
}

