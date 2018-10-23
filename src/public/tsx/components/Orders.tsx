import * as React from "react";
import OrderManagerModal from "./Order/OrderManagerModal";
import Pagination from "./Pagination";

interface IProps {
  itemsPerPage?: number;
  order?: {};
  orderDeliveryTime?: number;
  orders?: object[];
  orderState?: number;
  oldOrderState?: number;
  orderSystem?: number;
  orderManagerOpen?: boolean;
  page?: number;
  pagesCount?: number;
  pagesMax?: number;
  pageData?: object[];
  printData?: boolean;
  products?: object[];
  showOrderSucess?: boolean;

  getOrders(): Promise<void>;
  handleCancelOrder(cancellation: boolean): Promise<void>;
  handleCancelOrderState(orderId: string): void;
  handleChangeItemsPerPage(itemsPerPage: number): void;
  handleChangeOrderDeliveryTime(orderDeliveryTime: number): void;
  handleChangeOrderState(orderState: number): void;
  handleChangePage(page: number): void;
  handleOrderStateUpdate(e: React.FormEvent<HTMLElement>): Promise<void>;
  handlePageData(data: object[]): void;
  handlePrintSummary(e: Event): void;
  handleReorder(): void;
  handleSocketListener(): void;
  handleSortOrderByState(state: number): void;
  handleSearchOrderByNum(orderNum: string): void;
  showOrderManager(orderNum: string): void;
}

export default class Products extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.handleSocketListener();
    this.props.getOrders();
  }

  public render() {
    return[
      <OrderManagerModal
        handleChangeOrderDeliveryTime={this.props.handleChangeOrderDeliveryTime}
        handleChangeOrderState={this.props.handleChangeOrderState}
        handleOrderStateUpdate={this.props.handleOrderStateUpdate}
        handlePrintSummary={this.props.handlePrintSummary}
        order={this.props.order}
        orderDeliveryTime={this.props.orderDeliveryTime}
        orderManagerOpen={this.props.orderManagerOpen}
        orderState={this.props.orderState}
        oldOrderState={this.props.oldOrderState}
        printData={this.props.printData}
        showOrderSucess={this.props.showOrderSucess}
        key={0}
      />,
      <h2 key={1}>Zoznam objednávok</h2>,
      <div className="mt-3 pb-3 position-relative" key={2}>
        <div className="row mb-2">
          <div className="col-sm-4 col-md-2 col-lg-2">
            <button className="btn btn-outline-primary" onClick={this.props.handleReorder}>{
              this.props.orderSystem === 0 ?
              "Najnovšie" : "Najstaršie"
            }</button>
          </div>
          <div className="col-sm-4 col-md-5 col-lg-4">
            <select
              className="custom-select form-control mb-2"
              onChange={(e) => {
                const state = e.currentTarget.selectedIndex - 1;

                this.props.handleSortOrderByState(state);
            }}>
              <option value={4}>Stav objednávky</option>
              <option value={0}>Nová</option>
              <option value={1}>Vybavuje sa</option>
              <option value={2}>Vybavená</option>
              <option value={3}>Stornovaná</option>
            </select>
          </div>
          <div className="form-group col-sm-4 col-md-5 col-lg-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="searchByTitle"
                placeholder="Vyhľadaj podľa č. objednávky"
                onChange={(e) => {
                  const orderNum = e.currentTarget.value;

                  this.props.handleSearchOrderByNum(orderNum);
                }}
              />
              <div className="input-group-apend">
                <span className="input-group-text" style={{padding: ".635rem .75rem"}}>
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        {
          this.props.pageData ?
          (
            this.props.pageData.length > 0 ?
            [
              <table className="table table-striped mb-5" key={0}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Číslo obj.</th>
                    <th scope="col">Dátum</th>
                    <th scope="col">Stav obj.</th>
                    <th scope="col">Objednané položky</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.pageData.map((item, i) => {
                      const state = ["Nová", "Vybavuje sa", "Vybavená", "Stornovaná"];
                      const roughDate = (item as any).dateCreated.split("T")[0];
                      const date = `${roughDate.split("-")[2]}.${roughDate.split("-")[1]}.${roughDate.split("-")[0]}`;
                      let orderedProductCount;

                      if ((item as any).products) {
                        orderedProductCount = (item as any).products.length > 4 ?
                        `+${(item as any).products.length} produktov` :
                        (
                          (item as any).products.length > 1 ?
                          `+${(item as any).products.length} produkty` :
                          `+${(item as any).products.length} produkt`
                        );
                      }

                      return (
                        <tr key={i+1} className={(item as any).state > 2 ? "disable" : null}>
                          <th scope="row">{i+1}</th>
                          <td>{(item as any).orderNum}</td>
                          <td>{date}</td>
                          <td>
                            <span className={
                              (item as any).state > 0 ?
                              (
                                (item as any).state > 1 ?
                                (
                                  (item as any).state > 2 ?
                                  "text-muted font-weight-bold" : "text-success font-weight-bold"
                                ) : "text-warning font-weight-bold"
                              ) : "text-danger font-weight-bold"
                            }>
                              {state[(item as any).state]}
                            </span>
                          </td>
                          <td>{orderedProductCount}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={
                                () => this.props.showOrderManager((item as any).orderNum)
                              }
                              type="button"
                              disabled={(item as any).state > 2 ? true : false}
                            >Detail</button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => this.props.handleCancelOrderState((item as any)._id)}
                              disabled={(item as any).state > 1 ? true : ((item as any).state > 2 ? true : false)}
                            >Storno</button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>,
              this.props.orders && this.props.orders.length > 0 ?
              (
                this.props.pageData.length < 9 ?
                (
                  this.props.page > 1 ?
                  <Pagination
                    dataTotalLength={this.props.orders.length}
                    itemsPerPage={this.props.itemsPerPage}
                    handleChangeItemsPerPage={this.props.handleChangeItemsPerPage}
                    handleChangePage={this.props.handleChangePage}
                    page={this.props.page}
                    pagesCount={this.props.pagesCount}
                    pagesMax={this.props.pagesMax}
                    key={2}
                  /> : null
                ) :
                <Pagination
                  dataTotalLength={this.props.orders.length}
                  itemsPerPage={this.props.itemsPerPage}
                  handleChangeItemsPerPage={this.props.handleChangeItemsPerPage}
                  handleChangePage={this.props.handleChangePage}
                  page={this.props.page}
                  pagesCount={this.props.pagesCount}
                  pagesMax={this.props.pagesMax}
                  key={2}
                />
              ) : null
             ] :
            (<div className="list-group-item text-center">
              <p>Neboli nájdené žiadne objednávky.</p>
            </div>)
          ) : (
            <div className="w-100 d-flex justify-content-center mt-3">
              <img src="../assets/images/icons/loading.gif" width="50" height="50" />
            </div>
          )
        }
        <style>{`
          table tr.disable td, table tr.disable th, table tr.disable td span {color:#6c757d!important;}
        `}</style>
      </div>,
    ];
  }
}
