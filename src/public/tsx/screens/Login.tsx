import * as React from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { Redirect } from "react-router";

interface IProps {
  authorised: boolean;
  modalError?: boolean;
  modalText?: string;

  submitForm(event: React.FormEvent<HTMLFormElement>): void;
  handleRegister(register: boolean): void;
  handleCancelOrder(cancellation: boolean): void;
}

export default class Login extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.handleRegister(false);
  }

  public render() {
    return !this.props.authorised ?
      [
        <Modal
          modalError={this.props.modalError}
          modalText={this.props.modalText}
          handleCancelOrder={this.props.handleCancelOrder}
          key={0}
        />,
        <div className="container login" key={1}>
          <div className="row">
            <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 mt-3 ml-auto mr-auto">
              <h1 className="text-center">Login</h1>
              <Form register={false} submitForm={this.props.submitForm} />
            </div>
          </div>
        </div>,
      ] : <Redirect to="/admin" />;
  }
}
