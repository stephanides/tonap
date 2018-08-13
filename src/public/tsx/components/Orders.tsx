import * as React from "react";
// import { Link } from "react-router-dom";

interface IProps {
  orders?: object[];
  getOrders(): Promise<void>;
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
      <h2 key={0}>Zoznam Objednávok</h2>,
      <div className="list-group mb-3" key={1}>
        {
          this.props.orders && this.props.orders.length > 0 ?
          this.props.orders.map((item, i) => {
            const productsInfo = (item as any).products.map((product, j) => (
              <div key={j}>{(product as any)._id + ": " + (product as any).count}</div>
            ));

            return (
              <div className="list-group-item d-flex justify-content-between" key={i}>
                <div className="row">
                  <div className="col">{(item as any).orderNum}</div>
                  <div className="col">{(item as any).name + " " + (item as any).surname}</div>
                  <div className="col">{ productsInfo }</div>
                </div>
              </div>
            );
          }) :
          (<div className="list-group-item text-center">
             <p>Neboli nájdené žiadne objednávky.</p>
          </div>)
        }
      </div>,
    ];
  }
}
