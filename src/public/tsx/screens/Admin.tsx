import * as React from "react";
import Nav from "../components/Nav";
import { IUserPayLoad } from "../interfaces/UserPayLoad.interface";

interface IProps {
  user: IUserPayLoad;
  signOut(): void;
}

export default class Admin extends React.Component<IProps, {}> {
  public render() {
    return[
      <Nav
        user={this.props.user}
        signOut={this.props.signOut}
        key={0}
      />,
      <div key={1}>Admin</div>,
    ];
  }
}
