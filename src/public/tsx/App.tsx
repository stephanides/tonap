import * as React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import Admin from "./screens/Admin";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Redirect, Router, Route, Switch } from "react-router";

import IFile from "./interfaces/File.interface";
import IProduct from "./interfaces/Product.interface";
import { IUser } from "./interfaces/User.interface";

const history = createBrowserHistory();

interface IAppState {
  authorised?: boolean;
  imageFiles?: IFile[];
  imageNum?: number;
  itemsPerPage?: number;
  modalError?: boolean | null;
  modalText?: string;
  order?: {},
  orders?: object[];
  orderState?: number;
  orderManagerOpen?: boolean;
  orderSystem?: number;
  page?: number;
  pagesCount?: number;
  pageData?: object[];
  printData?: boolean;
  product?: IProduct;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;
  productToDelete?: number;
  register?: boolean;
  screen?: number;
  showDeleteModal?: boolean;
  showOrderSucess?: boolean;
  user?: IUser;
}

const productInit: IProduct = {
  category: 0,
  depth: 0,
  description: "",
  length: 0,
  notSterile: false,
  notSterileProductMaxCount: 0,
  notSterileProductMaxPackageCount: 0,
  notSterileProductMinCount: 0,
  notSterileProductMinPackageCount: 0,
  sterile: false,
  sterileProductMaxCount: 0,
  sterileProductMaxPackageCount: 0,
  sterileProductMinCount: 0,
  sterileProductMinPackageCount: 0,
  title: "",
  volume: 0,
  weight: 0,
  wide: 0,
};

const initialState: IAppState = {
  authorised: false,
  imageNum: 0,
  itemsPerPage: 10,
  orderManagerOpen: false,
  orderState: 0,
  orderSystem: 0,
  page: 1,
  printData: false,
  product: productInit,
  productEdit: false,
  productNumber: 0,
  screen: 0,
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
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.handleChangeOrderState = this.handleChangeOrderState.bind(this);
    this.handleOrderStateUpdate = this.handleOrderStateUpdate.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeProducts = this.handleChangeProducts.bind(this);
    this.handlePageCount = this.handlePageCount.bind(this);
    this.handlePageData = this.handlePageData.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handlePrintSummary = this.handlePrintSummary.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleProductEdit = this.handleProductEdit.bind(this);
    this.handleProductUpdate = this.handleProductUpdate.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.imageDrop = this.imageDrop.bind(this);
    this.imagePreviewSelect = this.imagePreviewSelect.bind(this);
    this.imageRemoveSelect = this.imageRemoveSelect.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showOrderManager = this.showOrderManager.bind(this);
    this.signOut = this.signOut.bind(this);
    this.storeProduct = this.storeProduct.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  public componentWillMount() {
    this.intervalCheckAuthenticate = window.setInterval(this.authenticate, 8 * 60 * 1000);
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
              closeDeleteModal={this.closeDeleteModal}
              deleteProduct={this.deleteProduct}
              handleChangeProducts={this.handleChangeProducts}
              imageDrop={this.imageDrop}
              imageFiles={this.state.imageFiles}
              imageNum={this.state.imageNum}
              imagePreviewSelect={this.imagePreviewSelect}
              imageRemoveSelect={this.imageRemoveSelect}
              getProducts={this.getProducts}
              getOrders={this.getOrders}
              handleChangeOrderState={this.handleChangeOrderState}
              handleChangePage={this.handleChangePage}
              handleOrderStateUpdate={this.handleOrderStateUpdate}
              handlePageData={this.handlePageData}
              handlePrintSummary={this.handlePrintSummary}
              handleProduct={this.handleProduct}
              handleProductEdit={this.handleProductEdit}
              handleProductUpdate={this.handleProductUpdate}
              handleReorder={this.handleReorder}
              handleShowDeleteModal={this.handleShowDeleteModal}
              modalError={this.state.modalError}
              modalText={this.state.modalText}
              order={this.state.order}
              orders={this.state.orders}
              orderState={this.state.orderState}
              orderSystem={this.state.orderSystem}
              orderManagerOpen={this.state.orderManagerOpen}
              page={this.state.page}
              pagesCount={this.state.pagesCount}
              pageData={this.state.pageData}
              printData={this.state.printData}
              product={this.state.product}
              products={this.state.products}
              productEdit={this.state.productEdit}
              productNumber={this.state.productNumber}
              productToDelete={this.state.productToDelete}
              routeProps={routeProps}
              showDeleteModal={this.state.showDeleteModal}
              showOrderManager={this.showOrderManager}
              showOrderSucess={this.state.showOrderSucess}
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

  private async deleteProduct(): Promise<void> {
    const id: string = (this.state.products[this.state.productToDelete] as any)._id;

    try {
      const request = await fetch("/api/product/" + id, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "DELETE",
      });

      if (request.status === 200) {
        // const responseJSON: any = await request.json();
        $("#deleteModal").modal("hide");
        this.setState({ showDeleteModal: false }, () => {
          this.getProducts();
        });
      } else {
        this.showModal(request.statusText, true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  private handleChangePage(page: number) {
    this.setState({page}, () => {
      if (this.state.screen) {
        this.handlePageData(this.state.products);
      } else {
        this.handlePageData(this.state.orders);
      }
    });
  }

  private handleChangeProducts(products: object[], productNum: number): void {
    this.setState({ products }, async () => {
      try {
        const request = await fetch("/api/product", {
          body: JSON.stringify(this.state.products[productNum]),
          headers: {
            "content-type": "application/json",
            "x-access-token": this.state.user.token,
          },
          method: "PUT",
        });

        if (request.status === 200) {
          const responseJson: any = await request.json();

          this.showModal(responseJson.message, false);
        } else {
          this.showModal(request.statusText, true);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  private handleChangeOrderState(orderState: number): void {
    const updatedOrder = this.state.order;

    (updatedOrder as any).state = orderState;
    
    this.setState({orderState, order: updatedOrder});
  }

  private async handleOrderStateUpdate(e: React.FormEvent<HTMLElement>): Promise<void> {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const state = form.state.value as number;
    const deliveryTime: string | null = state > 0 && state < 2 ? form.deliveryTime.value : null;
    const message = form.message.value as string;
    const orderId = (this.state.order as any)._id;
    const bodyToFetch = JSON.stringify({
      state, deliveryTime, message, orderId
    });

    try {
      const request = await fetch("/api/order/state", {
        body: bodyToFetch,
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "POST",
      });

      if (request.status === 200) {
        const responseJSON: any = await request.json();

        console.log(responseJSON.message);
        this.setState({
          orderState: 0,
          showOrderSucess: true,
        }, () => {
          this.getOrders();
          setTimeout(() => {
            this.setState({showOrderSucess: false});
          }, 3000);
        });
      } else {
        console.log(request);
      }
    } catch (err) {
      console.log(err);
    }
  }

  private handlePrintSummary(e: Event): void {
    const printableSummmary = (e.currentTarget as HTMLElement).parentElement;
    const printWindow = window.open("");

    this.setState({printData: true}, () => {
      printWindow.document.write(printableSummmary.outerHTML);
      printWindow.print();
      printWindow.addEventListener("beforeunload", () => {
        this.setState({printData: false});
      });
      printWindow.close();
    });
  }

  private handleProduct(product: IProduct): void {
    this.setState({ product });
  }

  private async handleProductUpdate(e: React.FormEvent<HTMLElement>): Promise<void> {
    e.preventDefault();

    try {
      const request = await fetch("/api/product", {
        body: JSON.stringify(this.state.product),
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "PUT",
      });

      if (request.status === 200) {
        const responseJSON: any = await request.json();

        this.setState({ productEdit: false });
        this.showModal(responseJSON.message, false);
      } else {
        this.setState({ productEdit: false });
        this.showModal(request.statusText, true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  private handlePageCount(data: object[]) {
    return Math.ceil(data.length / this.state.itemsPerPage);
  }

  private handlePageData(data: object[] | null) {
    if (data) {
      const begin = ((this.state.page - 1) * this.state.itemsPerPage);
      const end = begin + this.state.itemsPerPage;
      const dataItems = data.slice(begin, end);
      
      this.setState({pageData: dataItems});
    } else {
      this.setState({pageData: []});
    }
  }

  private handleRegister(register: boolean): void {
    if (!register) {
      this.setState({ register: false });
    } else {
      this.setState({ register: true });
    }
  }

  private handleProductEdit(n: number | null) {
    if (typeof n === "number") {
      const productForEdit: IProduct = this.state.products[n] as IProduct;
      this.setState({ product: productForEdit, productEdit: true });
    } else {
      this.setState({
        product: {
          category: 0,
          depth: 0,
          description: "",
          length: 0,
          notSterile: false,
          notSterileProductMaxCount: 0,
          notSterileProductMaxPackageCount: 0,
          notSterileProductMinCount: 0,
          notSterileProductMinPackageCount: 0,
          sterile: false,
          sterileProductMaxCount: 0,
          sterileProductMaxPackageCount: 0,
          sterileProductMinCount: 0,
          sterileProductMinPackageCount: 0,
          title: "",
          volume: 0,
          weight: 0,
          wide: 0,
        },
        productEdit: false });
    }
  }

  private handleReorder() {
    const data = this.state.orders;
    
    if (this.state.orderSystem === 0) {
      data.sort((a: any, b: any) => (b.dateCreated.toLowerCase().localeCompare(a.dateCreated.toLowerCase())));
      this.setState({orderSystem: 1}, () => this.handlePageData(data));
    } else {
      data.sort((a: any, b: any) => (a.dateCreated.toLowerCase().localeCompare(b.dateCreated.toLowerCase())))
      this.setState({orderSystem: 0}, () => this.handlePageData(data));
    }
  }

  private getUserData(): object {
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

  private async getProducts(): Promise<void> {
    try {
      const request = await fetch("/api/product", {
        headers: {
          "content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "GET",
      });

      if (request.status === 200) {
        const responseJSON = await request.json();
        const data = (responseJSON as any).data;

        this.setState({
          pagesCount: this.handlePageCount(data),
          products: data,
          screen: 1
        }, () => this.handlePageData(data));
      } else {
        this.setState({products: []}, () => {
          this.handlePageData(null);
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({products: []}, () => {
        this.handlePageData(null);
      });
    }
  }

  private async getOrders(): Promise<void> {
    try {
      const request = await fetch("/api/order", {
        headers: {
          "content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "GET",
      });

      if (request.status === 200) {
        const responseJSON = await request.json();
        const data: object[] = (responseJSON as any).data;

        this.setState({
          orders: data,
          pagesCount: this.handlePageCount(data),
          screen: 0,
        }, () => {
          this.handlePageData(data);
        });
      } else {
        this.setState({orders:[]}, () => {
          this.handlePageData(null);
        });
      }

    } catch (err) {
      console.log(err);
      this.setState({orders:[]}, () => {
        this.handlePageData(null);
      });
    }
  }

  private imageDrop(files: File[]): void {
    const reader: FileReader = new FileReader();
    let i = 0;
    const fileArr: any[] = [];

    console.log(files);

    if (files && files.length > 0) {
      const readFileFn = () => {
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          const base64Data: string = reader.result as string;
          (files[i] as any).data = base64Data;
          fileArr.push(files[i]);

          if (i < files.length - 1) {
            i++;
            readFileFn();
          }
        };
      };

      readFileFn();
      setTimeout(() => { this.setState({ imageFiles: fileArr }); }, 10);
    }
  }

  private imagePreviewSelect(n: number): void {
    this.setState({ imageNum: n });
  }

  private imageRemoveSelect(n: number): void {
    const imgArr: IFile[] = this.state.imageFiles;

    imgArr.splice(n, 1);
    this.setState({ imageFiles: imgArr, imageNum: 0 });
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

    for (const input of inputs as any) {
      formParams[input.id] = input.value;
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
      if (urlString.indexOf("login") > -1) {
        if (response.status === 404) {
          this.showModal("Užívateľ neexistuje, zaregistrujte sa prosím", true);
        } else {
          this.showModal(response.statusText, true);
        }
      } else {
        this.showModal(response.statusText, true);
      }
    }
  }

  private async storeProduct(e: React.FormEvent<HTMLElement>): Promise<void> {
    e.preventDefault();

    const form: HTMLFormElement = e.target as HTMLFormElement;
    const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input");
    const formParams: object = {};

    for (const input of inputs as any) {
      if (!input.disabled) {
        if (input.type === "checkbox") {
          formParams[input.id] = input.checked;
        } else {
          formParams[input.id] = input.value;
        }
      }
    }

    (formParams as any).description = form.description.value;

    const imageDataArr: object[] = [];

    if (this.state.imageFiles && this.state.imageFiles.length > 0) {
      for (const imageData of this.state.imageFiles) {
        imageDataArr.push({
          data: imageData.data,
          type: imageData.type.replace("image/", ""),
        });
      }

      (formParams as any).category = (form.querySelector("#category") as HTMLSelectElement)
      .options[(form.querySelector("#category") as HTMLSelectElement).selectedIndex].value;
      (formParams as any).imageFilesData = imageDataArr;

      try {
        const request = await fetch("/api/product", {
          body: JSON.stringify(formParams),
          headers: {
            "content-type": "application/json",
            "x-access-token": this.state.user.token,
          },
          method: "POST",
        });

        if (request.status === 200) {
          const responseJSON: Promise<any> = await request.json();

          this.showModal((responseJSON as any).message, false, () => {
            this.setState({
              imageFiles: [],
              product: {
                category: 0,
                depth: 0,
                description: "",
                length: 0,
                notSterile: false,
                notSterileProductMaxCount: 0,
                notSterileProductMaxPackageCount: 0,
                notSterileProductMinCount: 0,
                notSterileProductMinPackageCount: 0,
                sterile: false,
                sterileProductMaxCount: 0,
                sterileProductMaxPackageCount: 0,
                sterileProductMinCount: 0,
                sterileProductMinPackageCount: 0,
                title: "",
                volume: 0,
                weight: 0,
                wide: 0,
              },
            });
          });
        } else {
          this.showModal(request.statusText, true);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.showModal("Nahraj obrázky produktu, prosím.", true);
    }
  }

  private showModal(text: string, error: boolean, callback?: () => void): void {
    this.setState({ modalText: text, modalError: error }, () => {
      $("#commonModal").modal();
      if (typeof callback === "function") {
        callback();
      }
    });
  }

  private showOrderManager(orderNum: string) {
    let order: {};
    
    for (let i = 0; i < this.state.orders.length; i++) {
      if ((this.state.orders[i] as any).orderNum == orderNum) {
        order = this.state.orders[i];
      }
    }

    this.setState({
      order,
      orderManagerOpen: true,
    }, () => {
      $("#orderManagerModal").modal("show");
    });
  }

  private handleShowDeleteModal(productToDelete: number): void {
    this.setState({ productToDelete, showDeleteModal: true }, () => {
      $("#deleteModal").modal();
    });
  }

  private closeDeleteModal(): void {
    this.setState({ showDeleteModal: false });
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
