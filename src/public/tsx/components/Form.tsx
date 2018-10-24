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
          <label htmlFor="email">Emailová addresa</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Zadaj svoju emailovú adresu"
            required
          />
          <small id="emailHelp" className="form-text text-muted">Systém nezdieľa tvoje dáta s žiadnymi tretími stranami.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Heslo</label>
          <input type="password" className="form-control" id="password" placeholder="Zadaj heslo" required />
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
    <label htmlFor="firstName">Meno</label>
    <input id="firstName" type="text" className="form-control" placeholder="Zadaj svoje meno" required />
  </div>,
  <div className="form-group" key={1}>
    <label htmlFor="lastName">Priezvisko</label>
    <input id="lastName" type="text" className="form-control" placeholder="Zadaj svoje priezvisko" required />
  </div>];

const retypePassword = (
  <div className="form-group">
    <label htmlFor="retypePassword">Zopakuj heslo</label>
    <input type="password" className="form-control" id="retypePassword" placeholder="Zopakuj heslo" required />
  </div>
);
