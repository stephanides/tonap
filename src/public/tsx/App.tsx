import * as React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import Admin from "./screens/Admin";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Redirect, Router, Route, Switch } from "react-router";

import { IUser } from "./interfaces/User.interface";

const history = createBrowserHistory();

interface IAppState {
  authorised?: boolean;
  modalError?: boolean;
  modalText?: string;
  register?: boolean;
  user?: IUser;
}

const initialState: IAppState = {
  authorised: false,
};

export default class App extends React.Component<{}, IAppState> {
  private baseURL: string;
  private intervalCheckAuthenticate: number;
  private myStorage: Storage;

  constructor(props: any) {
    super(props);

    this.baseURL = window.location.protocol + "//" + window.location.host;
    this.intervalCheckAuthenticate = 0;
    this.state = initialState;
    this.myStorage = window.localStorage;

    this.authenticate = this.authenticate.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.showModal = this.showModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.storeProduct = this.storeProduct.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  public componentWillMount() {
    this.intervalCheckAuthenticate = window.setInterval(this.authenticate, 12 * 60 * 1000);
    this.authenticate();
  }

  public render() {
    return(
      <Router history={history}>
        <Switch>
          <Route path="/admin/login" render={() => (
            <Login
              modalError={this.state.modalError}
              modalText={this.state.modalText}
              authorised={this.state.authorised}
              submitForm={this.submitForm}
              handleRegister={this.handleRegister}
            />
          )} />
          <Route path="/admin/setup" render={() => (
            <Register
              modalError={this.state.modalError}
              modalText={this.state.modalText}
              handleRegister={this.handleRegister}
              submitForm={this.submitForm}
            />
          )} />
          <Route path="/admin" render={(routeProps) => (
              this.state.authorised ?
              <Admin
                routeProps={routeProps}
                signOut={this.signOut}
                storeProduct={this.storeProduct}
                user={this.state.user}
              /> :
              <Redirect to="/admin/login" />
            )} />
        </Switch>
      </Router>
    );
  }

  private authenticate(): void {
    const userData: IUser | null = this.getUserData() as IUser;

    if (userData) {
      this.setState({ authorised: true, user: userData });
    } else {
      this.signOut();
    }
  }

  private handleRegister(register: boolean) {
    if (!register) {
      this.setState({ register: false });
    } else {
      this.setState({ register: true });
    }
  }

  private getUserData() {
    let user: object | null = null;

    if (this.myStorage.getItem("uLT")) {
      const timeDiff: number = Date.now() - parseInt(this.myStorage.getItem("uLT"), 10);

      if (timeDiff < 2.88e+7) {
        user = {
          firstName: this.myStorage.getItem("uFN"),
          lastName: this.myStorage.getItem("uLN"),
          role: parseInt(this.myStorage.getItem("uR"), 10),
          token: this.myStorage.getItem("token"),
        };
      }
    }

    return user;
  }

  private signOut(): void {
    this.setState({
      authorised: false,
      user: {} as IUser,
    }, () => {
      this.myStorage.clear();
    });
  }

  private async submitForm(e: React.FormEvent<HTMLElement>, url?: string): Promise<void> {
    e.preventDefault();

    const form = e.target as HTMLElement;
    const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input");
    const urlString: string = url ? url.toLowerCase() : this.state.register ? "/user/setup" : "/user/login";
    const formParams: object = {};

    for (let i = 0; i < inputs.length; i++) {
      formParams[inputs[i].id] = inputs[i].value;
    }

    const response = await fetch(urlString, {
      body: JSON.stringify(formParams),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    if (response.status === 200) {
      const responseJSON = await response.json();

      if (urlString.indexOf("login") > -1) {
        this.storeUserData((responseJSON as any).user);
      } else {
        this.showModal((responseJSON as any).message, false);
      }
    } else {
      this.showModal(response.statusText, true);
    }
  }

  private async storeProduct(e: React.FormEvent<HTMLElement>): Promise<void> {
    e.preventDefault();

    const form: HTMLFormElement = e.target as HTMLFormElement;
    const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input");
    const formParams: object = {};

    for (let i = 0; i < inputs.length; i++) {
      formParams[inputs[i].id] = inputs[i].value;
    }

    (formParams as any).description = form.description.value;

    console.log(formParams);

    try {
      const request = await fetch("/api/product/store", {
        body: JSON.stringify(formParams),
        headers: {
          "content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "POST",
      });

      if (request.status === 200) {
        const responseJSON: Promise<any> = await request.json();

        console.log((responseJSON as any).message);
      } else {
        this.showModal(request.statusText, true);
      }

    } catch (err) {
      console.log(err);
    }
  }

  private showModal(text: string, error: boolean, callback?: () => void): void {
    this.setState({ modalText: text, modalError: error }, () => {
      $(".modal").modal();
      if (typeof callback === "function") {
        callback();
      }
    });
  }

  private storeUserData(data: IUser): void {
    this.myStorage.setItem("uFN", data.firstName);
    this.myStorage.setItem("uLN", data.lastName);
    this.myStorage.setItem("uR", String(data.role));
    this.myStorage.setItem("token", data.token);
    this.myStorage.setItem("uLT", String(Date.now()));

    this.authenticate();
  }
}
