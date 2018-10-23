import * as React from "react";

interface IProps {
  cancellation?: boolean;
  modalError?: boolean | null;
  modalText?: string;

  handleCancelOrder(cancellation: boolean): void;
}

export default class Modal extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      this.props.modalText ?
      <div className="modal" id="commonModal" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.props.modalError ? "Chyba!" : "Info"}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.props.modalText}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Zatvoriť</button>
              {
                this.props.cancellation ?
                (
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.handleCancelOrder(true)}>Stornovať</button>
                ) : null
              }
            </div>
          </div>
        </div>
      </div> : null
    );
  }
}
