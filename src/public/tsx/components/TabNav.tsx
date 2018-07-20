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
        <ul className="d-flex">
        <li className={this.props.routeProps.location.pathname.indexOf("products") < 0 ? "active" : null}>
            <Link to="/admin">Objednávky</Link>
          </li>
          <li className={this.props.routeProps.location.pathname.indexOf("products") > -1 ? "active" : null}>
            <Link to="/admin/products">Produkty</Link>
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
            position: relative;
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
            top: 1px;
          }

          .tabNav ul li a {
            padding: .5rem 1rem;
            text-decoration: none;
          }
        `} />
      </nav>
    );
  }
}
