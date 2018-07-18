import * as React from "react";

interface IProps {
  register: boolean;
  submitForm(event: React.FormEvent<HTMLFormElement>): void;
}

export default class Form extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    return(
      <form onSubmit={this.props.submitForm}>
        {this.props.register ? registerElements : null}
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">We"ll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" required />
        </div>
        {this.props.register ? retypePassword : null}
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

const registerElements = [
  <div className="form-group" key={0}>
    <label htmlFor="firstName">First Name</label>
    <input id="firstName" type="text" className="form-control" placeholder="Enter first name" required />
  </div>,
  <div className="form-group" key={1}>
    <label htmlFor="lastName">Last Name</label>
    <input id="lastName" type="text" className="form-control" placeholder="Enter last name" required />
  </div>,
  <div className="form-group" key={2}>
    <label htmlFor="companyName">Company Name</label>
    <input id="companyName" type="text" className="form-control" placeholder="Enter company name" required />
  </div>];

const retypePassword = (
  <div className="form-group">
    <label htmlFor="retypePassword">Retype Password</label>
    <input type="password" className="form-control" id="retypePassword" placeholder="Retype Password" required />
  </div>
);
