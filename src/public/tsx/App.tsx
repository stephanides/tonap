import * as React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import Admin from "./screens/Admin";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Redirect, Router, Route, Switch } from "react-router";
import * as io from "socket.io-client";

import IFile from "./interfaces/File.interface";
import IProduct from "./interfaces/Product.interface";
import { IUser } from "./interfaces/User.interface";

const history = createBrowserHistory();

interface IAppState {
  authorised?: boolean;
  cancellation?: boolean;
  cancellationOrderNumber?: number;
  imageFiles?: IFile[];
  imageNum?: number;
  itemsPerPage?: number;
  modalError?: boolean | null;
  modalText?: string;
  order?: {},
  orderDeliveryTime?: number;
  orders?: object[];
  orderState?: number;
  oldOrderState?: number;
  orderManagerOpen?: boolean;
  orderSystem?: number;
  page?: number;
  pagesCount?: number;
  pagesMax?: number;
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
  sales?: object[];
}

const productInit: IProduct = {
  count: 0,
  category: 0,
  description: "",
  height: "",
  gauge: "",
  title: "",
  variantName: '',
  variant: [{
    title: "",
    priceMin: "",
    priceMed: "",
    priceMax: "",
    boxCount: "",
    sackCount: "",
    inStock: true,
  }],
  volume: "",
  weight: "",
  // wide: 0,
};

const initialState: IAppState = {
  authorised: false,
  cancellation: false,
  imageNum: 0,
  itemsPerPage: 10,
  orderDeliveryTime: 0,
  orderManagerOpen: false,
  orderState: 0,
  oldOrderState: 0,
  orderSystem: 1,
  page: 1,
  pagesMax: 5,
  printData: false,
  product: productInit,
  productEdit: false,
  productNumber: 0,
  screen: 0,
  sales: [],
};

export default class App extends React.Component<{}, IAppState> {
  private baseURL: string;
  private intervalCheckAuthenticate: number;
  private myStorage: Storage;
  private socket: any;

  constructor(props: any) {
    super(props);

    this.baseURL = window.location.protocol + "//" + window.location.host;
    this.intervalCheckAuthenticate = 0;
    this.socket = io("/admin");
    this.state = initialState;
    this.myStorage = window.localStorage;

    this.authenticate = this.authenticate.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.handleCancelOrder = this.handleCancelOrder.bind(this);
    this.handleCancelOrderState = this.handleCancelOrderState.bind(this);
    this.handleChangeOrderState = this.handleChangeOrderState.bind(this);
    this.handleOrderStateUpdate = this.handleOrderStateUpdate.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeItemsPerPage = this.handleChangeItemsPerPage.bind(this);
    this.handleChangeProducts = this.handleChangeProducts.bind(this);
    this.handleChangeOrderDeliveryTime = this.handleChangeOrderDeliveryTime.bind(this);
    this.handlePageCount = this.handlePageCount.bind(this);
    this.handlePageData = this.handlePageData.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handlePrintSummary = this.handlePrintSummary.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleProductEdit = this.handleProductEdit.bind(this);
    this.handleProductUpdate = this.handleProductUpdate.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.handleSocketListener = this.handleSocketListener.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.handleSortOrderByState = this.handleSortOrderByState.bind(this);
    this.handleSerachByTitle = this.handleSerachByTitle.bind(this);
    this.handleSearchOrderByNum = this.handleSearchOrderByNum.bind(this);
    this.imageDrop = this.imageDrop.bind(this);
    this.imagePreviewSelect = this.imagePreviewSelect.bind(this);
    this.imageRemoveSelect = this.imageRemoveSelect.bind(this);
    this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showOrderManager = this.showOrderManager.bind(this);
    this.signOut = this.signOut.bind(this);
    this.storeProduct = this.storeProduct.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitSale = this.submitSale.bind(this);
    this.getSales = this.getSales.bind(this);
    this.removeSale = this.removeSale.bind(this);
  }

  public componentWillMount() {
    this.intervalCheckAuthenticate = window.setInterval(this.authenticate, 8 * 60 * 1000);
    this.authenticate();
  }

  public render() {
    const locationInput: string[] = window.location.pathname.split("/");
    let loc: string;

    if (locationInput.length > 2) {
      loc = locationInput[2].charAt(0).toUpperCase() + locationInput[2].substr(1);
    } else {
      loc = locationInput[1].charAt(0).toUpperCase() + locationInput[1].substr(1);
    }

    document.getElementsByTagName("title")[0].innerHTML = loc === "Admin" ? "Tonap | Admin" : `Tonap | Admin - ${loc}`;

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
              handleCancelOrder={this.handleCancelOrder}
            />
          )} />
          <Route path="/admin/setup" render={() => (
            <Register
              modalError={this.state.modalError}
              modalText={this.state.modalText}
              handleRegister={this.handleRegister}
              submitForm={this.submitForm}
              handleCancelOrder={this.handleCancelOrder}
            />
          )} />
          <Route path="/admin" render={(routeProps) => (
            this.state.authorised ?
            <Admin
              cancellation={this.state.cancellation}
              closeDeleteModal={this.closeDeleteModal}
              deleteProduct={this.deleteProduct}
              handleChangeProducts={this.handleChangeProducts}
              imageDrop={this.imageDrop}
              imageFiles={this.state.imageFiles}
              imageNum={this.state.imageNum}
              imagePreviewSelect={this.imagePreviewSelect}
              imageRemoveSelect={this.imageRemoveSelect}
              itemsPerPage={this.state.itemsPerPage}
              getProducts={this.getProducts}
              getOrders={this.getOrders}
              handleCancelOrder={this.handleCancelOrder}
              handleCancelOrderState={this.handleCancelOrderState}
              handleChangeOrderState={this.handleChangeOrderState}
              handleChangeOrderDeliveryTime={this.handleChangeOrderDeliveryTime}
              handleChangeItemsPerPage={this.handleChangeItemsPerPage}
              handleChangePage={this.handleChangePage}
              handleOrderStateUpdate={this.handleOrderStateUpdate}
              handlePageData={this.handlePageData}
              handlePrintSummary={this.handlePrintSummary}
              handleProduct={this.handleProduct}
              handleProductEdit={this.handleProductEdit}
              handleProductUpdate={this.handleProductUpdate}
              handleReorder={this.handleReorder}
              handleShowDeleteModal={this.handleShowDeleteModal}
              handleSocketListener={this.handleSocketListener}
              handleSortBy={this.handleSortBy}
              handleSortOrderByState={this.handleSortOrderByState}
              handleSerachByTitle={this.handleSerachByTitle}
              handleSearchOrderByNum={this.handleSearchOrderByNum}
              modalError={this.state.modalError}
              modalText={this.state.modalText}
              order={this.state.order}
              orderDeliveryTime={this.state.orderDeliveryTime}
              orders={this.state.orders}
              oldOrderState={this.state.oldOrderState}
              orderState={this.state.orderState}
              orderSystem={this.state.orderSystem}
              orderManagerOpen={this.state.orderManagerOpen}
              page={this.state.page}
              pagesCount={this.state.pagesCount}
              pagesMax={this.state.pagesMax}
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
              submitSale={this.submitSale}
              getSales={this.getSales}
              sales={this.state.sales}
              removeSale={this.removeSale}
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

  private handleCancelOrderState(orderId: string) {
    let orderNum: number;
    
    for (let i = 0; i < this.state.orders.length; i++) {
      if (orderId == (this.state.orders as any)[i]._id) {
        orderNum = (this.state.orders as any)[i].orderNum;
      }
    }

    this.setState({cancellationOrderNumber: orderNum}, () => {
      this.showModal(`Stornovať objednávku číslo: ${orderNum}?`, false, true);
    });
  }

  private async handleCancelOrder(cancellation: boolean): Promise<void> {
    let orderId: number, state: number;

    if (cancellation) {
      state = 3;
    }
    
    for (let i = 0; i < this.state.orders.length; i++) {
      if (this.state.cancellationOrderNumber == (this.state.orders as any)[i].orderNum) {
        orderId = (this.state.orders as any)[i]._id;
      }
    } 
    const bodyToFetch = JSON.stringify({orderId, state}); // cancellation
  
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

        this.setState({
          // orderState: state,
          showOrderSucess: true,
        }, () => {
          this.getOrders();
          setTimeout(() => {
            this.setState({showOrderSucess: false});
          }, 4000);
        });
      } else {
        console.log(request);
      }
    } catch (err) {
      this.showModal(err.stack, true);
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

  private handleChangeItemsPerPage(itemsPerPage: number): void {
    this.setState({itemsPerPage}, () => {
      if (this.state.screen > 0) {
        this.setState({
          pagesCount: this.handlePageCount(this.state.products)
        }, () => {
          this.handlePageData(this.state.products);
        });
      } else {
        this.setState({
          pagesCount: this.handlePageCount(this.state.orders)
        }, () => {
          this.handlePageData(this.state.orders);
        });
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
    const oldOrderState = this.state.orderState;
    
    this.setState({orderState, oldOrderState});
  }

  private handleChangeOrderDeliveryTime(orderDeliveryTime: number): void {
    this.setState({orderDeliveryTime});
  }

  private async handleOrderStateUpdate(e: React.FormEvent<HTMLElement>): Promise<void> {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const state: number = this.state.orderState;
    const deliveryTime: number = form.deliveryTime ? form.deliveryTime.selectedIndex : null;
    const message: string | null = form.message.value ? form.message.value : null;
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

        this.setState({
          // orderState: state,
          showOrderSucess: true,
        }, () => {
          this.getOrders();
          setTimeout(() => {
            this.setState({showOrderSucess: false});
          }, 4000);
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

    const form = e.currentTarget;
    const updatedProduct = this.state.product;
    const variations = form.querySelectorAll(".variation-form-rows > .row");
    let variationsArr = [];

    for(let i = 0; i < variations.length; i++) {
      let obj = {} as any;
      const variationItems = variations[i].querySelectorAll("input.variation");

      for(let j = 0; j < variationItems.length; j++) {
        if(variationItems[j].className.indexOf("title") > -1) {
          obj.title = (variationItems[j] as HTMLInputElement).value;
        } else if(variationItems[j].className.indexOf("price-min") > -1) {
          obj.priceMin = (variationItems[j] as HTMLInputElement).value;
        } else if(variationItems[j].className.indexOf("price-med") > -1) {
          obj.priceMed = (variationItems[j] as HTMLInputElement).value;
        } else if (variationItems[j].className.indexOf("price-max") > -1) {
          obj.priceMax = (variationItems[j] as HTMLInputElement).value;
        } else if (variationItems[j].className.indexOf("sack-count") > -1) {
          obj.sackCount = (variationItems[j] as HTMLInputElement).value;
        } else if (variationItems[j].className.indexOf("box-count") > -1) {
          obj.boxCount = (variationItems[j] as HTMLInputElement).value;
        } else {
          obj.inStock = (variationItems[j] as HTMLInputElement).checked;
        }
      }

      variationsArr.push(obj);
    }

    (updatedProduct as any).variant = variationsArr;

    try {
      const request = await fetch("/api/product", {
        body: JSON.stringify(updatedProduct), // this.state.product
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
      if (this.state.itemsPerPage < 51) {
        const begin = ((this.state.page - 1) * this.state.itemsPerPage);
        const end = begin + this.state.itemsPerPage;
        const dataItems = data.slice(begin, end);
        
        this.setState({pageData: dataItems});
      } else {
        this.setState({pageData: data});
      }
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
          // depth: 0,
          description: "",
          height: "",
          gauge: "",
          // length: 0,
          // notSterile: false,
          // notSterileProductMaxCount: 0,
          // notSterileProductMaxPackageCount: 0,
          // notSterileProductMinCount: 0,
          // notSterileProductMinPackageCount: 0,
          // sterile: false,
          // sterileProductMaxCount: 0,
          // sterileProductMaxPackageCount: 0,
          // sterileProductMinCount: 0,
          // sterileProductMinPackageCount: 0,
          title: "",
          volume: "",
          weight: "",
          // wide: 0,
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
      data.sort((a: any, b: any) => (a.dateCreated.toLowerCase().localeCompare(b.dateCreated.toLowerCase())));
      this.setState({orderSystem: 0}, () => this.handlePageData(data));
    }
  }

  private handleSortBy(category: number) {
    const data: object[] = this.state.products;
    
    if (category > 0) {
      let newData: object[] = [];

      for (let i = 0; i < data.length; i++) {
        if ((data[i] as any).category === category) {
          newData.push(data[i]);
        }
      }
      
      this.handlePageData(newData);
    } else {
      this.handlePageData(data);
    }
  }

  private handleSerachByTitle(title: string) {
    const data: object[] = this.state.products;

    if (title) {
      let newData: object[] = [];

      for (let i = 0; i < data.length; i++) {
        if ((data[i] as any).title.toLowerCase().indexOf(title.toLocaleLowerCase()) > -1) {
          newData.push(data[i]);
        }
      }
      
      this.handlePageData(newData);
    } else {
      this.handlePageData(data);
    }
  }

  private handleSocketListener() {
    this.socket.on("order been created", (data) => {
      if (data.success) {
        this.getOrders();
        return;
      }
    });
  }

  private handleSortOrderByState(state: number) {
    const data: object[] = this.state.orders;
    
    if (state > -1) {
      let newData: object[] = [];

      for (let i = 0; i < data.length; i++) {
        if ((data[i] as any).state === 4 && state === 1) {
          newData.push(data[i]);
        } else if ((data[i] as any).state === state) {
          newData.push(data[i]);
        }
      }
      
      // this.setState({}, () => {});
      this.handlePageData(newData);
    } else {
      this.handlePageData(data);
    }
  }

  private handleSearchOrderByNum(orderNum: string) {
    const data: object[] = this.state.orders;

    if (orderNum) {
      let newData: object[] = [];

      for (let i = 0; i < data.length; i++) {
        if (String((data[i] as any).orderNum).indexOf(orderNum) > -1) {
          newData.push(data[i]);
        }
      }
      
      this.handlePageData(newData);
    } else {
      this.handlePageData(data);
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
        
        data.sort((a: any, b: any) => (b.dateCreated.toLowerCase().localeCompare(a.dateCreated.toLowerCase())));

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

  private async getSales(): Promise<void> {
    try {
      const response = await fetch('/sale', {
        headers: { "content-type": "application/json" },
        method: "GET",
      });

      if (response.status === 200) {
        const { data } = await response.json();

        this.setState({ sales: data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  private async submitSale(e: React.FormEvent<HTMLElement>, url?: string): Promise<void> {
    e.preventDefault();

    const urlString: string = url ? url.toLowerCase() : "../api/sale";
    const form = e.currentTarget as any;
    const saleCode = form.saleCode.value;
    const sale = parseInt(form.sale.options[form.sale.selectedIndex].value, 10);
    const formParams = {
      saleCode,
      sale,
    };

    try {
      await fetch(urlString, {
        body: JSON.stringify(formParams),
        headers: {
          "content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "POST",
      });
      console.log("SALE CREATED");
      this.getSales();
    } catch (err) {
      console.log(err);
    }
  }

  private async removeSale(saleID: String) {
    console.log(saleID);
    try {
      const request = await fetch("/api/sale/", {
        body: JSON.stringify({ _id: saleID }),
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.state.user.token,
        },
        method: "DELETE",
      });

      if (request.status === 200) {
        const { message } = await request.json();

        console.log(message);
        this.getSales();
      }
    } catch (err) {
      console.log(err);
    }
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
    const variations = form.querySelectorAll(".variation-form-rows > .row"); // form.querySelectorAll("input.variation");
    const formParams: object = {} as IProduct;
    let variationsArr = [];

    for (const input of inputs as any) {
      if (!input.disabled) {
        if (input.type === "checkbox") {
          formParams[input.id] = input.checked;
        } else {
          if(input.id) {
            formParams[input.id] = input.value;
          }
        }
      }
    }

    for(let i = 0; i < variations.length; i++) {
      let obj = {} as any;
      const variationItems = variations[i].querySelectorAll("input.variation");

      for(let j = 0; j < variationItems.length; j++) {
        if(variationItems[j].className.indexOf("title") > -1) {
          obj.title = (variationItems[j] as HTMLInputElement).value;
        } else if(variationItems[j].className.indexOf("price-min") > -1) {
          obj.priceMin = (variationItems[j] as HTMLInputElement).value;
        } else if(variationItems[j].className.indexOf("price-med") > -1) {
          obj.priceMed = (variationItems[j] as HTMLInputElement).value;
        } else if (variationItems[j].className.indexOf("price-max") > -1) {
          obj.priceMax = (variationItems[j] as HTMLInputElement).value;
        } else if (variationItems[j].className.indexOf("sack-count") > -1) {
          obj.sackCount = (variationItems[j] as HTMLInputElement).value;
        } else if (variationItems[j].className.indexOf("box-count") > -1) {
          obj.boxCount = (variationItems[j] as HTMLInputElement).value;
        } else {
          obj.inStock = (variationItems[j] as HTMLInputElement).checked;
        }
      }

      variationsArr.push(obj);
    }

    (formParams as any).variant = variationsArr;
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

      // console.log(formParams);

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

          this.showModal("Dáta boli úspešne uložené.", false, undefined, () => { // (responseJSON as any).message
            this.setState({
              imageFiles: [],
              product: {
                category: 0,
                // depth: 0,
                description: "",
                height: "",
                gauge: "",
                // length: 0,
                // notSterile: false,
                // notSterileProductMaxCount: 0,
                // notSterileProductMaxPackageCount: 0,
                // notSterileProductMinCount: 0,
                // notSterileProductMinPackageCount: 0,
                // sterile: false,
                // sterileProductMaxCount: 0,
                // sterileProductMaxPackageCount: 0,
                // sterileProductMinCount: 0,
                // sterileProductMinPackageCount: 0,
                title: "",
                volume: "",
                variant: [{
                  title: "",
                  priceMin: "",
                  priceMed: "",
                  priceMax: "",
                  boxCount: "",
                  sackCount: "",
                  inStock: true,
                }],
                weight: "",
                // wide: 0,
              },
            }, () => {
              const formRowsContainer = form.querySelector(".variation-form-rows");
              const variationRows = formRowsContainer.querySelectorAll('.row');

              let m = variationRows.length - 1;

              while(m > 0) {
                variationRows[m].remove();
                m = m - 1;
              }
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

  private showModal(text: string, error: boolean, cancellation?: boolean, callback?: () => void): void {
    this.setState({ modalText: text, modalError: error }, () => {
      $("#commonModal").modal();
      if (typeof cancellation !== "undefined") {
        this.setState({cancellation});
      }
      if (typeof callback === "function") {
        callback();
      }
    });
  }

  private showOrderManager(orderNum: string) {
    let order: {} = {};

    this.setState({
      orderDeliveryTime: 0,
      orderState: 0,
      order,
    });
    
    for (let i = 0; i < this.state.orders.length; i++) {
      if ((this.state.orders[i] as any).orderNum == orderNum) {
        order = this.state.orders[i];
      }
    }

    this.setState({
      order,
      orderDeliveryTime: (order as any).deliveryTime,
      orderState: (order as any).state,
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
