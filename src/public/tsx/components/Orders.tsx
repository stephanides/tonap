import * as React from "react";

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
      <h2 key={0}>Zoznam objednávok</h2>,
      <div className="list-group mb-3" key={1}>
        {
          this.props.orders ?
          (
            this.props.orders.length > 0 ?
            (
              <div className="list-group">
                <div className="list-group-item bg-info d-flex justify-content-between">
                  <div className="col-2 text-white">UID</div>
                  <div className="col-auto text-white">Dátum</div>
                  <div className="col-3 text-white">Objednávateľ</div>
                  <div className="col-3 text-white">Detail objednávky</div>
                  <div className="col-3 text-white">Správa objednávky</div>
                </div>
                {
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
                          <div key={j}>
                            <div className="row justify-content-between">
                              <div>{(product as any).title}</div>
                              <div>{(productInfo as any).count}</div>
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    });

                    return (
                      <div className="list-group-item d-flex justify-content-between" key={i}>
                        <div className="col-2">{(item as any).orderNum}</div>
                        <div className="col-auto">{(item as any).dateCreated.split("T")[0]}</div>
                        <div className="col-3">{(item as any).name + " " + (item as any).surname}</div>
                        <div className="col-3">
                          <div className="row justify-content-between">
                            <div>Názov produktu</div>
                            <div>Počet produktov</div>
                          </div>
                          {productsInfo}
                        </div>
                        <div className="col-3">
                          <button type="button" className="btn btn-primary align-items-center">Spravovať</button>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
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
