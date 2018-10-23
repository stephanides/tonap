import * as React from "react";
import Form from "../components/Form";
import Modal from "../components/Layout/Modal";
import { Link } from "react-router-dom";

interface IProps {
  modalError?: boolean;
  modalText?: string;

  submitForm(event: React.FormEvent<HTMLFormElement>): void;
  handleRegister(register: boolean): void;
  handleCancelOrder(cancellation: boolean): void;
}

export default class Register extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.handleRegister(true);
  }

  public render() {
    return[
      <Modal
        modalError={this.props.modalError}
        modalText={this.props.modalText}
        handleCancelOrder={this.props.handleCancelOrder}
        key={0}
      />,
      <div className="container register" key={1}>
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 mt-3 ml-auto mr-auto">
          <h1 className="text-center">Register</h1>
          <Form register={true} submitForm={this.props.submitForm} />
          <p className="text-center">
            You allready have an account? Please <Link to="/admin/login">log in</Link>.
          </p>
          </div>
        </div>
      </div>,
    ];
  }
}
