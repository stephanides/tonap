import * as React from "react";

const OrderManagerModal = (props) => {
  const {orderManagerOpen, order} = props;

  return(
    orderManagerOpen ?
    <div className="modal" id="orderManagerModal" role="dialog">
      <div className="modal-dialog" role="document">
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
            Order body
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal">Zatvoriť</button>
          </div>
        </div>
      </div>
    </div> : null
  );
};

export default OrderManagerModal;
