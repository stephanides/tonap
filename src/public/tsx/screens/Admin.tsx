import "react";
import * as React from "react";
import DeleteModal from "../components/DeleteModal";
import HeaderNav from "../components/HeaderNav";
import Modal from "../components/Modal";
import Orders from "../components/Orders";
import ProductCreate from "../components/ProductCreate";
import ProductEditModal from "../components/ProductEditModal";
import ProductList from "../components/ProductList";
import { IUserPayLoad } from "../interfaces/UserPayLoad.interface";
import { Route } from "react-router-dom";
import TabNav from "../components/TabNav";
import IFile from "../interfaces/File.interface";
import { TSImportEqualsDeclaration } from "babel-types";
import IProduct from "../interfaces/Product.interface";

interface IProps {
  imageFiles?: IFile[];
  imageNum?: number;
  modalError?: boolean | null;
  modalText?: string;
  product?: IProduct;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;
  productToDelete?: number;
  routeProps: any;
  showDeleteModal?: boolean;
  user: IUserPayLoad;

  closeDeleteModal(): void;
  deleteProduct(): Promise<void>;
  handleChangeProducts(products: object[], productNum: number): void;
  handleProduct(product: object): void;
  handleProductEdit(n: number | null): void;
  handleProductUpdate(e: React.FormEvent<HTMLElement>): Promise<void>;
  handleShowDeleteModal(productToDelete: number): void;
  imageDrop(files: File[]): void;
  imagePreviewSelect(n: number): void;
  imageRemoveSelect(n: number): void;
  getProducts(): Promise<void>;
  getOrders(): Promise<void>;
  signOut(): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
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
        modalError={this.props.modalError}
        modalText={this.props.modalText}

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
      <div key={3}>
        <HeaderNav
          user={this.props.user}
          signOut={this.props.signOut}
        />
        <div className="container">
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
              products={this.props.products}
              deleteProduct={this.props.deleteProduct}
              getProducts={this.props.getProducts}
              handleChangeProducts={this.props.handleChangeProducts}
              handleProductEdit={this.props.handleProductEdit}
              handleShowDeleteModal={this.props.handleShowDeleteModal}
            />
          )} />
          <Route exact path={`${this.props.routeProps.match.url}`} render={() => (
            <Orders getOrders={this.props.getOrders} />
          )} />
        </div>

        <style jsx>{`
          h1, h2, h3, h4, h5, h6, a, li { color: #3b8acc; }
        `}</style>
      </div>,
    ];
  }
}
