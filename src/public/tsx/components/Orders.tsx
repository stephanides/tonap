import * as React from "react";
// import { Link } from "react-router-dom";

interface IProps {
  orders?: object[];
  products?: object[];

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
            const productsInfo = (item as any).products.map((productInfo, j) => {
              let product: object = {};

              if (this.props.products && this.props.products.length > 0) {
                for (const prod of this.props.products) {
                  if ((prod as any)._id === (productInfo as any)._id) {
                    product = prod;
                  }
                }

                return(
                  <div key={j}><p>{(product as any).title + ", " + (productInfo as any).count}</p></div>
                );
              } else {
                return null;
              }
            });

            return (
              <div className="list-group-item d-flex justify-content-between" key={i}>
                <div className="row">
                  <div className="col-auto">{(item as any).orderNum}</div>
                  <div className="col-auto">{(item as any).name + " " + (item as any).surname}</div>
                  <div className="col-auto">{productsInfo}</div>
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
