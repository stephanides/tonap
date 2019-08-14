import * as React from "react";
import _JSXStyle from "styled-jsx/style";
import { Link } from "react-router-dom";

interface IProps {
  routeProps: any;
}

export default class TabNav extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      <nav className="tabNav">
        <ul className="d-flex position-relative">
          <li className={
            this.props.routeProps.location.pathname.indexOf("product") < 0
            ? (
              this.props.routeProps.location.pathname.indexOf("list") < 0 ?
                (
                  this.props.routeProps.location.pathname.indexOf("sale") < 0 ? "active" : null
                ) : null
            ) : null
          }>
            <i className="fas fa-box-open d-flex align-items-center ml-2"></i>
            <Link to="/admin">Objednávky</Link>
            <span></span>
          </li>
          <li className={this.props.routeProps.location.pathname.indexOf("product-list") > -1 ? "active" : null}>
            <i className="fas fa-vial d-flex align-items-center ml-2"></i>
            <Link to="/admin/product-list">Zoznam produktov</Link>
            <span></span>
          </li>
          <li className={this.props.routeProps.location.pathname.indexOf("product-insert") > -1 ? "active" : null}>
            <i className="fas fa-plus d-flex align-items-center ml-2"></i>
            <Link to="/admin/product-insert">Vložiť Produkt</Link>
            <span></span>
          </li>
          <li className={this.props.routeProps.location.pathname.indexOf("sale") > -1 ? "active" : null}>
            <i className="fas fa-percent d-flex align-items-center ml-2"></i>
            <Link to="/admin/sale">Zľavy</Link>
            <span></span>
          </li>
        </ul>

        <_JSXStyle styleId="tabNavUl" css={`
          .tabNav {
            margin-top: 1rem;
          }
          .tabNav ul {
            border-bottom: 1px solid #55bee3;
            list-style: none;
            padding: 0;
          }

          .tabNav ul li {
            display: inline-flex;
            margin: 0;
            padding: 0;
            border: 1px solid #fff;
            position: relative;
          }

          .tabNav ul li:hover, .tabNav ul li.active {
            border: 1px solid #55bee3;
            border-bottom: 1px solid #fff;
            border-radius: .5rem .5rem 0 0;
          }

          .tabNav ul li a {
            padding: .5rem 1rem;
            text-decoration: none;
          }

          .tabNav ul li:hover span, .tabNav ul li.active span {
            width: 100%;
            height: 0;
            border: 1px solid #fff;
            position: absolute;
            bottom: -2px;
          }
        `} />
      </nav>
    );
  }
}
