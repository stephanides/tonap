import * as React from "react";
import OrderManagerModal from "./Order/OrderManagerModal";
import Pagination from "./Pagination";

interface IProps {
  order?: {};
  orders?: object[];
  orderState?: number;
  orderSystem?: number;
  orderManagerOpen?: boolean;
  page?: number;
  pagesCount?: number;
  pageData?: object[];
  printData?: boolean;
  products?: object[];
  showOrderSucess?: boolean;

  getOrders(): Promise<void>;
  handleChangeOrderState(orderState: number): void;
  handleChangePage(page: number): void;
  handleOrderStateUpdate(e: React.FormEvent<HTMLElement>): Promise<void>;
  handlePageData(data: object[]): void;
  handlePrintSummary(e: Event): void;
  handleReorder(): void;
  handleSortOrderByState(state: number): void;
  handleSearchOrderByNum(orderNum: string): void;
  showOrderManager(orderNum: string): void;
}

export default class Products extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getOrders();
  }

  public render() {
    return[
      <OrderManagerModal
        handleChangeOrderState={this.props.handleChangeOrderState}
        handleOrderStateUpdate={this.props.handleOrderStateUpdate}
        handlePrintSummary={this.props.handlePrintSummary}
        order={this.props.order}
        orderManagerOpen={this.props.orderManagerOpen}
        orderState={this.props.orderState}
        printData={this.props.printData}
        showOrderSucess={this.props.showOrderSucess}
        key={0}
      />,
      <h2 key={1}>Zoznam objednávok</h2>,
      <div className="mt-3" key={2}>
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
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.pageData.map((item, i) => {
                      const state = ["Nová", "Vybavuje sa", "Vybavená"];
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
                        <tr key={i+1}>
                          <th scope="row">{i+1}</th>
                          <td>{(item as any).orderNum}</td>
                          <td>{date}</td>
                          <td>
                            <span className={
                              (item as any).state > 0 ?
                              (
                                (item as any).state > 1 ?
                                "text-success font-weight-bold" : "text-warning font-weight-bold"
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
                              }>Detail</button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>,
              this.props.pageData.length < 9 ?
              (
                this.props.page > 1 ?
                <Pagination
                  handleChangePage={this.props.handleChangePage}
                  page={this.props.page}
                  pagesCount={this.props.pagesCount}
                  key={2}
                /> : null
              ) :
              <Pagination
                handleChangePage={this.props.handleChangePage}
                page={this.props.page}
                pagesCount={this.props.pagesCount}
                key={2}
              />
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
      </div>,
    ];
  }
}
