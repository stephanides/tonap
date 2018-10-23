import * as React from "react";
// import _JSXStyle from "styled-jsx/style";
import { Link } from "react-router-dom";
// import ProductEditModal from "./ProductEditModal";
import ProductListItem from "./ProductListItem";
import Pagination from "../Layout/Pagination";

interface IProps {
  itemsPerPage?: number;
  products?: object[];
  pageData?: object[];
  page?: number;
  pagesCount?: number;
  pagesMax?: number;

  deleteProduct(i: number): Promise<void>;
  getProducts(): Promise<void>;
  handleChangeItemsPerPage(itemsPerPage: number): void;
  handleChangePage(page: number): void;
  handleChangeProducts(products: object[], productNum: number): void;
  handleProductEdit(n: number | null): void;
  handleShowDeleteModal(productToDelete: number): void;
  handleSortBy(category: number): void;
  handleSerachByTitle(title: string): void;
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
        <div className="mt-3 pb-3 position-relative">
          <div className="row mb-2">
            <div className="col-sm-4 col-md-2 col-lg-2 d-flex">Zoradiť podľa</div>
            <div className="col-sm-4 col-md-5 col-lg-4">
              <select
                className="custom-select form-control mb-2"
                onChange={(e) => {
                  const category = e.currentTarget.selectedIndex;

                  this.props.handleSortBy(category);
              }}>
                <option value={0}>Kategórie</option>
                <option value={1}>Masťovky a Kelímky</option>
                <option value={2}>Petriho misky a odberníky</option>
                <option value={3}>Skúmavky</option>
              </select>
            </div>
            <div className="form-group col-sm-4 col-md-5 col-lg-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="searchByTitle"
                  placeholder="Vyhľadaj podľa názvu"
                  onChange={(e) => {
                    const title = e.currentTarget.value;

                    this.props.handleSerachByTitle(title);
                  }}
                />
                <div className="input-group-apend">
                  <span className="input-group-text" style={{padding: ".635rem .75rem"}}>
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
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
                      <th scope="col" className="text-center">Aktívny</th>
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
                            <td className="text-center">{
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
                              <span className="w-100 d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => this.props.handleProductEdit(i)}
                                >Upraviť</button>
                              </span>
                            </td>
                            <td>
                              <span className="w-100 d-flex justify-content-center">
                                <button
                                  type="button"
                                  className="btn btn-danger ml-2"
                                  onClick={() => this.props.handleShowDeleteModal(i)}
                                >Vymazať</button>
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>,
                this.props.products && this.props.products.length > 0 ?
                (
                  this.props.pageData.length < 9 ?
                  (
                    this.props.page > 1 ?
                    <Pagination
                      dataTotalLength={this.props.products.length}
                      itemsPerPage={this.props.itemsPerPage}
                      handleChangeItemsPerPage={this.props.handleChangeItemsPerPage}
                      handleChangePage={this.props.handleChangePage}
                      page={this.props.page}
                      pagesCount={this.props.pagesCount}
                      pagesMax={this.props.pagesMax}
                      key={2}
                    /> : null
                  ) :
                  <Pagination
                    dataTotalLength={this.props.products.length}
                    itemsPerPage={this.props.itemsPerPage}
                    handleChangeItemsPerPage={this.props.handleChangeItemsPerPage}
                    handleChangePage={this.props.handleChangePage}
                    page={this.props.page}
                    pagesCount={this.props.pagesCount}
                    pagesMax={this.props.pagesMax}
                    key={2}
                  />
                ) : null
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
      </div>
    );
  }
}

