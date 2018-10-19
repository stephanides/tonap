import * as React from "react";
import OrderManagerModal from "./Order/OrderManagerModal";
import Pagination from "./Pagination";

interface IProps {
  order?: {};
  orders?: object[];
  orderState?: number;
  orderManagerOpen?: boolean;
  page?: number;
  pagesCount?: number;
  pageData?: object[];
  products?: object[];

  getOrders(): Promise<void>;
  handleChangeOrderState(orderState: number): void;
  handleChangePage(page: number): void;
  handleOrderStateUpdate(e: React.FormEvent<HTMLElement>): Promise<void>;
  handlePageData(data: object[]): void;
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
        order={this.props.order}
        orderManagerOpen={this.props.orderManagerOpen}
        orderState={this.props.orderState}
        key={0}
      />,
      <h2 key={1}>Zoznam objednávok</h2>,
      <div className="mt-3" key={2}>
        {
          this.props.pageData ?
          (
            this.props.pageData.length > 0 ?
            [
              <table className="table mb-5" key={0}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Číslo obj.</th>
                    <th scope="col">Dátum</th>
                    <th scope="col">Stav</th>
                    <th scope="col">Objednané položky</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.pageData.map((item, i) => {
                      const state = ["Nová obj.", "Vybavuje sa", "Vybavená"];
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
                          <td>{state[(item as any).state]}</td>
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
              <Pagination
                handleChangePage={this.props.handleChangePage}
                page={this.props.page}
                pagesCount={this.props.pagesCount}
                key={1}
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
