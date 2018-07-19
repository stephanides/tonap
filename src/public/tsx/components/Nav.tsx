import * as React from "react";
import { Link } from "react-router-dom";
import { IUserPayLoad } from "../interfaces/UserPayLoad.interface";

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
            <img src="../assets/images/logo.png" />
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
                <button onClick={this.props.signOut}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
