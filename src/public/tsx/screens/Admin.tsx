// import "react";
import * as React from "react";
import DeleteModal from "../components/Product/DeleteModal";
import HeaderNav from "../components/Layout/HeaderNav";
import Modal from "../components/Layout/Modal";
import Orders from "../components/Order/Orders";
import Sale from "../components/Sale";

import ProductCreate from "../components/Product/ProductCreate";
import ProductEditModal from "../components/Product/ProductEditModal";
import ProductList from "../components/Product/ProductList";

import { IUserPayLoad } from "../interfaces/UserPayLoad.interface";
import { Route } from "react-router-dom";
import TabNav from "../components/Layout/TabNav";
import IFile from "../interfaces/File.interface";
// import { TSImportEqualsDeclaration } from "babel-types";
import IProduct from "../interfaces/Product.interface";

interface IProps {
  cancellation?: boolean;
  imageFiles?: IFile[];
  imageNum?: number;
  itemsPerPage?: number;
  modalError?: boolean | null;
  modalText?: string;
  order?: {};
  orderDeliveryTime?: number;
  orders?: object[];
  orderState?: number;
  oldOrderState?: number;
  orderSystem?: number;
  orderManagerOpen?: boolean;
  page?: number;
  pagesCount?: number;
  pagesMax?: number;
  pageData?: object[];
  printData?: boolean;
  product?: IProduct;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;
  productToDelete?: number;
  routeProps: any;
  showDeleteModal?: boolean;
  showOrderSucess?: boolean;
  user: IUserPayLoad;
  sales?: object[];

  closeDeleteModal(): void;
  deleteProduct(): Promise<void>;
  handleCancelOrder(cancellation: boolean): Promise<void>;
  handleCancelOrderState(orderId: string): void;
  handleChangeItemsPerPage(itemsPerPage: number): void;
  handleChangeOrderDeliveryTime(orderDeliveryTime: number): void;
  handleChangeOrderState(orderState: number): void;
  handleOrderStateUpdate(e: React.FormEvent<HTMLElement>): Promise<void>;
  handleChangePage(page: number): void;
  handleChangeProducts(products: object[], productNum: number): void;
  handlePageData(data: object[]): void;
  handleProduct(product: object): void;
  handleProductEdit(n: number | null): void;
  handleProductUpdate(e: React.FormEvent<HTMLElement>): Promise<void>;
  handlePrintSummary(e: Event): void;
  handleReorder(): void;
  handleShowDeleteModal(productToDelete: number): void;
  handleSocketListener(): void;
  handleSortBy(category: number): void;
  handleSortOrderByState(state: number): void;
  handleSerachByTitle(title: string): void;
  handleSearchOrderByNum(orderNum: string): void;
  imageDrop(files: File[]): void;
  imagePreviewSelect(n: number): void;
  imageRemoveSelect(n: number): void;
  getProducts(): Promise<void>;
  getOrders(): Promise<void>;
  showOrderManager(orderNum: string): void;
  signOut(): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
  submitSale(e:React.FormEvent<HTMLElement>, url?: string): Promise<void>;
  getSales(): Promise<void>;
  removeSale(saleID: String): Promise<void>;
}

export default class Admin extends React.Component<IProps, {}> {
  public render() {
    return[
      <DeleteModal
        closeDeleteModal={this.props.closeDeleteModal}
        deleteProduct={this.props.deleteProduct}
        handleShowDeleteModal={this.props.handleShowDeleteModal}
        products={this.props.products}
        productToDelete={this.props.productToDelete}
        showDeleteModal={this.props.showDeleteModal}

        key={0} />,
      <Modal
        cancellation={this.props.cancellation}
        modalError={this.props.modalError}
        modalText={this.props.modalText}

        handleCancelOrder={this.props.handleCancelOrder}

        key={1}
      />,
      <ProductEditModal
        product={this.props.product}
        products={this.props.products}
        productEdit={this.props.productEdit}
        productNumber={this.props.productNumber}
        handleProduct={this.props.handleProduct}
        handleProductEdit={this.props.handleProductEdit}
        handleProductUpdate={this.props.handleProductUpdate}
        storeProduct={this.props.storeProduct}
        key={2}
      />,
      <div key={3} style={{minHeight: "calc(100vh - 100px)"}}>
        <HeaderNav
          user={this.props.user}
          signOut={this.props.signOut}
        />
        <div className="container" style={{marginBottom: "100px"}}>
          <TabNav routeProps={this.props.routeProps} />
          <Route path={`${this.props.routeProps.match.url}/product-insert`} render={() => (
            <ProductCreate
              imageDrop={this.props.imageDrop}
              imageFiles={this.props.imageFiles}
              imageNum={this.props.imageNum}
              imagePreviewSelect={this.props.imagePreviewSelect}
              imageRemoveSelect={this.props.imageRemoveSelect}
              product={this.props.product}
              handleProduct={this.props.handleProduct}
              storeProduct={this.props.storeProduct}
            />
          )} />
          <Route path={`${this.props.routeProps.match.url}/product-list`} render={() => (
            <ProductList
              itemsPerPage={this.props.itemsPerPage}
              page={this.props.page}
              pagesCount={this.props.pagesCount}
              pagesMax={this.props.pagesMax}
              pageData={this.props.pageData}
              products={this.props.products}
              deleteProduct={this.props.deleteProduct}
              getProducts={this.props.getProducts}
              handleChangeItemsPerPage={this.props.handleChangeItemsPerPage}
              handleChangePage={this.props.handleChangePage}
              handleChangeProducts={this.props.handleChangeProducts}
              handleProductEdit={this.props.handleProductEdit}
              handleShowDeleteModal={this.props.handleShowDeleteModal}
              handleSortBy={this.props.handleSortBy}
              handleSerachByTitle={this.props.handleSerachByTitle}
            />
          )} />
          <Route exact path={`${this.props.routeProps.match.url}`} render={() => (
            <Orders
              itemsPerPage={this.props.itemsPerPage}
              orderManagerOpen={this.props.orderManagerOpen}
              getOrders={this.props.getOrders}
              handleCancelOrder={this.props.handleCancelOrder}
              handleCancelOrderState={this.props.handleCancelOrderState}
              handleChangeItemsPerPage={this.props.handleChangeItemsPerPage}
              handleChangeOrderDeliveryTime={this.props.handleChangeOrderDeliveryTime}
              handleChangeOrderState={this.props.handleChangeOrderState}
              handleChangePage={this.props.handleChangePage}
              handleOrderStateUpdate={this.props.handleOrderStateUpdate}
              handlePageData={this.props.handlePageData}
              handlePrintSummary={this.props.handlePrintSummary}
              handleReorder={this.props.handleReorder}
              handleSocketListener={this.props.handleSocketListener}
              handleSortOrderByState={this.props.handleSortOrderByState}
              handleSearchOrderByNum={this.props.handleSearchOrderByNum}
              order={this.props.order}
              orderDeliveryTime={this.props.orderDeliveryTime}
              orders={this.props.orders}
              orderState={this.props.orderState}
              oldOrderState={this.props.oldOrderState}
              orderSystem={this.props.orderSystem}
              page={this.props.page}
              pagesCount={this.props.pagesCount}
              pagesMax={this.props.pagesMax}
              pageData={this.props.pageData}
              printData={this.props.printData}
              products={this.props.products}
              showOrderManager={this.props.showOrderManager}
              showOrderSucess={this.props.showOrderSucess}
            />
          )} />
          <Route exact path={`${this.props.routeProps.match.url}/sale`} render={() => (
            <Sale
              getSales={this.props.getSales}
              submitSale={this.props.submitSale}
              removeSale={this.props.removeSale}
              sales={this.props.sales}
            />
          )} />
        </div>

        <style>{`
          h1, h2, h3, h4, h5, h6, a, li {color: #3b8acc;}
          .variation-form-rows input { border: 1px solid #ced4da; border-radius: .25rem; float: left; padding: .375rem .75rem; margin-right: .5rem; }
          .variation-form-rows .clear { clear: both; }
        `}</style>
      </div>,
      <div className="footer d-flex align-items-center position-absolute" key={4}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <p>
                <img src="../assets/images/tonap_logo.svg" alt="Tonap" />
              </p>
            </div>
            <div className="col-6">
              <p className="text-right"><small>&copy; 2018 | Designed and assembled by codebrothers s. r. o.</small></p>
            </div>
          </div>
        </div>
        <style>{`
          .footer {
            width: 100%;
            background-color: #f9fdff;
            height: 100px;
            bottom: -100px;
          }
          .footer div img {width:100px;}
          .footer div p {color:#3b8acc;}
        `}</style>
      </div>
    ];
  }
}
