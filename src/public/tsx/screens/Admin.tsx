import * as React from "react";
import HeaderNav from "../components/HeaderNav";
import _JSXStyle from "styled-jsx/style";
import Orders from "../components/Orders";
import Products from "../components/Products";
import { IUserPayLoad } from "../interfaces/UserPayLoad.interface";
import { Route } from "react-router-dom";
import TabNav from "../components/TabNav";

interface IProps {
  routeProps: any;
  user: IUserPayLoad;

  signOut(): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
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
            <Products storeProduct={this.props.storeProduct} />
          )} />
          <Route exact path={`${this.props.routeProps.match.url}`} component={Orders} />
        </div>

        <style jsx global>{`
          h1, h2, h3, h4, h5, h6, a, li { color: #3b8acc; }
        `}</style>
      </div>
    );
  }
}
