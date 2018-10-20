import * as React from "react";

const OrderManagerModal = (props) => {
  const {
    handleChangeOrderState,
    handleOrderStateUpdate,
    handlePrintSummary,
    orderManagerOpen,
    orderState,
    order,
    printData,
    showOrderSucess,
  } = props;

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
                    className="btn btn-outline-info position-absolute"
                    style={{
                      top: 0,
                      right: 0,
                      fontSize: "x-small",
                      display: printData ? "none" : "block",
                    }}
                    onClick={(e) => handlePrintSummary(e)}
                  >
                    Tlačiť <i className="fas fa-print"></i>
                  </button>
                  <table className="table table-striped table-bordered mt-3">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Názov produktu</th>
                        <th scope="col">Typ</th>
                        <th scope="col">Balené po.</th>
                        <th scope="col">Veľkosť krabice</th>
                        <th scope="col">Počet krabíc</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        order.products.map((item, i) => {
                          const sterility: string = item.isSterile ? "Sterilné" : "Nesterilné";

                          return (
                            <tr key={i+1}>
                              <td scope="row">{i+1}</td>
                              <td>{item.title}</td>
                              <td>{sterility}</td>
                              <td className="text-center">{item.package}</td>
                              <td className="text-center">{item.boxSize}</td>
                              <td className="text-center">{item.boxCount}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  <p>{`Objednávateľ: ${order.name}, ${order.phone}, ${order.email}`}</p>
                  {
                    order.company ? <p>{`Spoločnosť: ${order.company}`}</p> : null
                  }
                  {
                    order.ico ? <p>{`IČO: ${order.ico}`}</p> : null
                  }
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <h6>Správa objednávky:</h6>
                <form onSubmit={handleOrderStateUpdate}>
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
                      value={order.state}
                      disabled={order.state > 1 ? true : false}
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
                          >
                            <option value="0">10 prac. dní</option>
                            <option value="1">15 prac. dní</option>
                            <option value="2">20 prac. dní</option>
                            <option value="3">30 prac. dní</option>
                            <option value="4">viac ako 30. prac. dní</option>
                          </select>
                        </div>
                      ) : null
                    ) : null
                  }
                  <div className="form-group">
                    <label htmlFor="message">Správa pre zákazníka</label>
                    <textarea
                      aria-describedby="messageHelp"
                      className="form-control"
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Sem napíš správu o stave objednávky, ktorá bude odoslaná zákazníkovi."
                      disabled={orderState > 0 ? false : true}
                    ></textarea>
                    <small id="messageHelp" className="form-text text-muted">Vyplnením tohto textového poľa, budú predošlé informácie ignorované.</small>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={orderState > 0 ? false : true}
                    >Upraviť stav objednávky</button>
                  </div>
                </form>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-center">
                <img
                  src="./assets/images/icons/check-mark-circle.svg"
                  width="50"
                  height="50"
                  style={
                    showOrderSucess ?
                    {
                      display: "block",
                    } : {
                      display: "none",
                    }
                  }
                />
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
    </div> : null
  );
};

export default OrderManagerModal;
