import "react";
import * as React from "react";
import HeaderNav from "../components/HeaderNav";
import Orders from "../components/Orders";
import Products from "../components/Products";
import { IUserPayLoad } from "../interfaces/UserPayLoad.interface";
import { Route } from "react-router-dom";
import TabNav from "../components/TabNav";
import IFile from "../interfaces/File.interface";

interface IProps {
  imageFiles?: IFile[];
  imageNum?: number;
  routeProps: any;
  user: IUserPayLoad;

  imageDrop(files: File[]): void;
  imagePreviewSelect(n: number): void;
  imageRemoveSelect(n: number): void;
  signOut(): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

declare module "react" {
  interface IHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export default class Admin extends React.Component<IProps, {}> {
  public render() {
    return(
      <div>
        <HeaderNav
          user={this.props.user}
          signOut={this.props.signOut}
        />
        <div className="container">
          <TabNav routeProps={this.props.routeProps} />
          <Route path={`${this.props.routeProps.match.url}/products`} render={() => (
            <Products
              imageDrop={this.props.imageDrop}
              imageFiles={this.props.imageFiles}
              imageNum={this.props.imageNum}
              imagePreviewSelect={this.props.imagePreviewSelect}
              imageRemoveSelect={this.props.imageRemoveSelect}
              storeProduct={this.props.storeProduct}
            />
          )} />
          <Route exact path={`${this.props.routeProps.match.url}`} component={Orders} />
        </div>

        <style jsx>{`
          h1, h2, h3, h4, h5, h6, a, li { color: #3b8acc; }
        `}</style>
      </div>
    );
  }
}
