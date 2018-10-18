import * as React from "react";
import OrderManagerModal from "./Order/OrderManagerModal";

interface IProps {
  order?: {};
  orders?: object[];
  orderManagerOpen?: boolean;
  products?: object[];

  getOrders(): Promise<void>;
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
        order={this.props.order}
        orderManagerOpen={this.props.orderManagerOpen}
        key={0}
      />,
      <h2 key={1}>Zoznam objednávok</h2>,
      <div className="list-group mb-3" key={2}>
        {
          this.props.orders ?
          (
            this.props.orders.length > 0 ?
            (
              <table className="table">
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
                    this.props.orders.map((item, i) => {
                      const state = ["Nová obj.", "Vybavuje sa", "Vybavená"];
                      const roughDate = (item as any).dateCreated.split("T")[0];
                      const date = `${roughDate.split("-")[2]}.${roughDate.split("-")[1]}.${roughDate.split("-")[0]}`;
                      const orderedProductCount = (item as any).products.length > 4 ?
                       `+${(item as any).products.length} produktov` :
                       (
                         (item as any).products.length > 1 ?
                         `+${(item as any).products.length} produkty` :
                         `+${(item as any).products.length} produkt`
                       );
                      /*const products = (item as any).map((product, j) => {});*/

                      return (
                        <tr key={i}>
                          <th scope="row">{i}</th>
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
              </table>
            ) :
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
