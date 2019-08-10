import * as React from "react";

interface IProps {
  order?: IOrder;
  orderDeliveryTime?: number;
  orderManagerOpen?: boolean;
  orderState?: number;
  oldOrderState?: number;
  printData?: boolean;
  showOrderSucess?: boolean;

  handleChangeOrderDeliveryTime(orderDeliveryTime: number): void;
  handleChangeOrderState(orderState: number): void;
  handleOrderStateUpdate(e: React.FormEvent<HTMLElement>): Promise<void>;
  handlePrintSummary(e: Event): void;
}

interface IOrder {
  // city?: string;
  billingAddress?: IAddress;
  company?: string;
  dateCreated?: string;
  dateModified?: string;
  deliveryAddress?: IAddress;
  deliveryTime?: number;
  email?: string;
  ico?: string;
  dic?: string;
  message?: string;
  name?: string;
  state?: number;
  phone?: string;
  orderNum?: number;
  // psc?: string;
  products?: IProducts[];
  paymentMethod?: number;
  surname?: string;
  sale?: ISale;
}
interface ISale {
  saleCode: String;
  salesPercentage: Number;
}
interface IAddress {
  city?: string;
  psc?: string;
  street?: string;
}
interface IProducts {
  count?: number;
  isSterile?: boolean;
  title?: string;
  package?: number;
  sackCount?: number;
  boxSize?: number;
  boxCount?: number
  variantName?: string;
}

const OrderManagerModal = (props: IProps) => {
  const {
    handleChangeOrderDeliveryTime,
    handleChangeOrderState,
    handleOrderStateUpdate,
    handlePrintSummary,
    orderManagerOpen,
    orderState,
    oldOrderState,
    order,
    orderDeliveryTime,
    printData,
    showOrderSucess,
  } = props;
  const date = new Date();

  let orderSale = undefined;

  if (order && order.sale) {
    orderSale = order.sale;
  }

  const clientDate = date.getDate() + "." + (date.getMonth() - 1) + "." + date.getFullYear();
  const orderMDate = order ?
  (
    order.dateModified ?
    order.dateModified.split("T")[0].split("-")[2] + "." + order.dateModified.split("T")[0].split("-")[1] + "." + order.dateModified.split("T")[0].split("-")[0] :
    null
  ) : null;
  const orderDateCreated = order ?
  (
    order.dateCreated ?
    order.dateCreated.split("T")[0].split("-")[2] + "." + order.dateCreated.split("T")[0].split("-")[1] + "." + order.dateCreated.split("T")[0].split("-")[0] :
    null
  ) : null;

  return(
    orderManagerOpen ?
    <div className="modal" id="orderManagerModal" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {`Objednávka č. ${order.orderNum}`}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="printable-summary position-relative">
                  <h6>Súhrn objednávky:</h6>
                  <p className={printData ? "" : "d-none"}>Číslo objednávky: <strong>{order.orderNum}</strong></p>
                  <button
                    type="button"
                    className="btn btn-outline-info position-absolute print"
                    style={{
                      top: 0,
                      right: 0,
                      fontSize: "x-small",
                      display: printData ? "none" : "block",
                    }}
                    onClick={(e) => handlePrintSummary(e as any)}
                  >
                    Tlačiť <i className="fas fa-print"></i>
                  </button>
                  <table className="table table-striped table-bordered mt-3">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Názov produktu</th>
                        <th scope="col">Variant</th>
                        <th scope="col">Počet kusov.</th>
                        <th scope="col">Počet ks. v sáčku</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        order.products.map((item, i) => {
                          // const sterility: string = item.isSterile ? "Sterilné" : "Nesterilné";

                          return (
                            <tr key={i+1}>
                              <td scope="row">{i+1}</td>
                              <td>{item.title}</td>
                              <td>{item.variantName}</td>
                              <td className="text-center">{item.count}</td>
                              <td className="text-center">{item.sackCount}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  <h6>Dátum prijatia objednávky: <span className="text-info">{orderDateCreated}</span></h6>
                  <p>
                    <strong>Spôsob platby</strong>: {
                      order.paymentMethod < 2 ? (
                        order.paymentMethod < 1 ? 'Zaplatené, platba kartou.' : 'Na dobrierku.'
                      ) : 'Pri osobnom odbere v hotovosti.'
                    }
                  </p>
                  {
                    orderSale.salesPercentage > 0 && (
                      <p>
                        Bol využitý zľavový kód:
                        {' '}
                        <span className="font-weight-bold">
                          {orderSale.saleCode}
                        </span>
                        {' '}
                        so zľavou:
                        {' '}
                        <span className="font-weight-bold">
                          {orderSale.salesPercentage}
                        </span>
                        %.
                      </p>
                    )
                  }
                  <table className="border w-100" cellPadding="10" cellSpacing="5">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Objednávateľ:</strong>{` ${order.name} ${order.surname},`}<br />
                          <strong>Telefón:</strong>{` ${order.phone},`}<br />
                          <strong>E-mail:</strong>{` ${order.email},`}
                        </td>
                        <td>
                        {
                          order.company ?
                          (
                            order.ico ?
                            (
                              <span>
                                <strong>Spoločnosť:</strong>{` ${order.company}`}<br />
                                <strong>IČO:</strong>{` ${order.ico}`}<br />
                                <strong>DIČ:</strong>{` ${order.dic}`}
                              </span>
                            ) :
                            <span><strong>Spoločnosť:</strong>{` ${order.company}`}</span>
                          ) : 
                          (
                            <span>
                              <strong>Fakturačná adresa:</strong><br />
                              <strong>Ulica:</strong>{` ${order.billingAddress.street}`}<br />
                              <strong>PSČ:</strong>{` ${order.billingAddress.psc}`}<br />
                              <strong>Mesto:</strong>{` ${order.billingAddress.city}`}
                            </span>
                          )
                        }
                        </td>
                      </tr>
                      <tr>
                        <td className={order.deliveryAddress.city? "border-top" : null}>
                        {
                          order.deliveryAddress.city ?
                          (
                            <span>
                              <strong>Doručovacia adresa:</strong><br />
                              <strong>Ulica:</strong>{` ${order.deliveryAddress.street}`}<br />
                              <strong>PSČ:</strong>{` ${order.deliveryAddress.psc}`}<br />
                              <strong>Mesto:</strong>{` ${order.deliveryAddress.city}`}
                            </span>
                          ) : null
                        }
                        </td>
                        <td className={order.company ? "border-top" : null}>
                          {
                            order.company ?
                            (
                              <span>
                                <strong>Fakturačná adresa:</strong><br />
                                <strong>Ulica:</strong>{` ${order.billingAddress.street}`}<br />
                                <strong>PSČ:</strong>{` ${order.billingAddress.psc}`}<br />
                                <strong>Mesto:</strong>{` ${order.billingAddress.city}`}
                              </span>
                            ) : null
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {
              order.message ?
              <p className="mt-2 pb-2 border-bottom">
                <strong>Správa od zákazníka:</strong><br />{` ${order.message}`}
              </p> : null
            }
            <div className="row mt-3">
              <div className="col-12">
                <h6>Správa objednávky:</h6>
                <form onSubmit={(e) => handleOrderStateUpdate(e)}>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="state">Stav objednávky</label>
                        <select
                          className="form-control"
                          id="state"
                          name="state"
                          onChange={(e) => {
                            const currentOrderState = e.target.selectedIndex;

                            handleChangeOrderState(currentOrderState);
                          }}
                          value={orderState}
                          disabled={order.state > 1 && order.state < 4 ? true : false}
                        >
                          <option value="0" disabled={true}>Nová objednávka</option>
                          <option value="1" disabled={order.state == 1 ? true : false}>Vybavuje sa</option>
                          <option value="2" disabled={order.state == 2 ? true : false}>Vybavená</option>
                        </select>
                      </div>
                      {
                        orderState > 0 ?
                        (
                          orderState < 2 ?
                          (
                            <div className="form-group">
                              <label htmlFor="deliveryTime">Vybavenie objednávky do:</label>
                              <select
                                className="form-control"
                                id="deliveryTime"
                                name="deliveryTime"
                                onChange={(e) => {
                                  const orderDeliveryTime: number = (e.currentTarget as HTMLSelectElement).selectedIndex;

                                  handleChangeOrderDeliveryTime(orderDeliveryTime);
                                }}
                                value={orderDeliveryTime}
                              >
                                <option value="0">2. prac. dní</option>
                                <option value="1">3. prac. dní</option>
                                <option value="2">4. prac. dní</option>
                                <option value="3">5. prac. dní</option>
                                <option value="4">10. prac. dní</option>
                                <option value="5">15. prac. dní</option>
                                <option value="6">20. prac. dní</option>
                                <option value="7">viac ako 20. prac. dní</option>
                              </select>
                            </div>
                          ) : null
                        ) : null
                      }
                    </div>
                    <div className="col-6 pt-1">
                      {
                        orderState > 0 ?
                        (
                          orderState < 2 ?
                          (
                            orderDeliveryTime > 0 ?
                            (
                              orderDeliveryTime > 1 ?
                              (
                                orderDeliveryTime > 2 ?
                                (
                                  orderDeliveryTime > 3 ?
                                  (
                                    orderDeliveryTime > 4 ?
                                    (
                                      orderDeliveryTime > 5 ?
                                      (
                                        orderDeliveryTime > 6 ?
                                        <p className="text-danger">Záväzne dodať objednávku po 20. prac. dňoch, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                                        : <p className="text-danger">Záväzne dodať objednávku do 20. prac. dní, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                                      ) : <p className="text-danger">Záväzne dodať objednávku do 15. prac. dní, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                                    ) : <p className="text-danger">Záväzne dodať objednávku do 10. prac. dní, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                                  ) : <p className="text-danger">Záväzne dodať objednávku do 5. prac. dní, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                                ) : <p className="text-danger">Záväzne dodať objednávku do 4. prac. dní, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                              ) : <p className="text-danger">Záväzne dodať objednávku do 3. prac. dní, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                            ) : <p className="text-danger">Záväzne dodať objednávku do 2. prac. dní, odo dňa <strong>{orderMDate ? orderMDate : clientDate}</strong>.</p>
                          ) : 
                          orderState > 3 ?
                          <p className="text-danger">Nie je špecifikovaný čas dodania objednávky.<br />
                          Objednávka sa <strong>VYBAVUJE</strong> odo dňa: <strong>{orderMDate ? orderMDate : clientDate}</strong></p> :
                          <p className="text-success">Objednávka je vybavená.</p>
                        ) : null
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="message">Správa pre zákazníka:</label>
                        <p><i><small>{`Dobrý deň pán/pani ${order.name}`}</small></i></p>
                        <textarea
                          aria-describedby="messageHelp"
                          className="form-control"
                          id="message"
                          name="message"
                          rows={6}
                          onFocus={() => handleChangeOrderState(4) /*-1*/}
                          onBlur={() => {
                            // handleChangeOrderState(oldOrderState);
                          }}
                          placeholder="Sem napíš správu o stave objednávky, ktorá bude odoslaná zákazníkovi.&#10;&#10;Vyplnením tohto textového poľa, budú predošlé informácie o čase vybavenia obj. ignorované."
                          disabled={orderState !== 0 ? false : true}
                        ></textarea>
                        <p className="mt-1"><i><small>V prípade akýchkoľvek otázok nás neváhajte kontaktovať na telefónnom čísle <strong>+421 918 243 753</strong>.<br />Alebo prostredníctvom e-mailu <strong>info@tonap.sk</strong><br /><br />S prianim pekného dňa,<br />tím <strong>TONAP</strong> s. r. o.</small></i></p>
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content- flex-column">
                      <img
                        src="./assets/images/icons/check-mark-circle.svg"
                        width="50"
                        height="50"
                        style={showOrderSucess ? {display: "block"} : {display: "none"}}
                      />
                      <p className={showOrderSucess ? "text-info text-center mt-2" : "d-none"}>Informácie o stave objednávky boli úspešne odoslané zákazníkovi.</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={
                            orderState > 0 ? (
                              order.state > 1 ?
                              (
                                order.state < 3 ?
                                true : false 
                              ) : false
                            ) : true
                          }
                        >Upraviť stav objednávky</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >Zatvoriť</button>
          </div>
        </div>
      </div>
      <style>
        {`
          .modal button.print {
            border: 1px solid #17a2b8!important;
            border-radius: .25rem;
            background: none!important;
            color: #17a2b8;
            margin-top: 0;
            padding: .375rem .75rem;
          }
        `}
      </style>
    </div> : null
  );
};

export default OrderManagerModal;
