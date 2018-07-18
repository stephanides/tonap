import * as React from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom";

interface IProps {
  submitForm(event: React.FormEvent<HTMLFormElement>): void;
  handleRegister(register: boolean): void;
}

export default class Register extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }
  public componentWillMount() {
    this.props.handleRegister(true);
  }

  public render() {
    return(
      <div className="container register">
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 mt-3 ml-auto mr-auto">
          <h1 className="text-center">Register</h1>
          <Form register={true} submitForm={this.props.submitForm} />
          <p className="text-center">
            You allready have an account? Please <Link to="/dashboard/login">log in</Link>.
          </p>
          </div>
        </div>
      </div>
    );
  }
}
