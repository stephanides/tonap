import "react";
import * as React from "react";
import _JSXStyle from "styled-jsx/style";
import { Link } from "react-router-dom";
import { IUserPayLoad } from "../../interfaces/UserPayLoad.interface";

interface IProps {
  user: IUserPayLoad;

  signOut(): void;
}

export default class Nav extends React.PureComponent<IProps, {}> {
  public render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/admin">
            <img className="jsx-i1" src="../assets/images/tonap_logo.svg" />

            <_JSXStyle styleId="i1" css={`img.jsx-i1 { width: 150px; }`} />
          </Link>
          <button type="button" data-toggle="collapse" data-target="navbarCollapse" className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarCollapse" className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item position-relative">
                {this.props.user.firstName}
              </li>
              <li className="nav-item">
                <button className="blo" onClick={this.props.signOut} title="Log out">
                  <i className="fas fa-sign-out-alt"></i>
                </button>

                <_JSXStyle styleId="blo" css={`
                  .blo {
                    background-color: transparent;
                    border: 0;
                  }
                `} />
              </li>
            </ul>
          </div>
        </div>
        <_JSXStyle styleId="navbar" css={`
          .navbar {
            background-color: #f9fdff;
          }
        `} />
      </nav>
    );
  }
}
