import * as React from "react";

import IProduct from "../../interfaces/Product.interface";

interface IProps {
  products?: object[];
  productToDelete?: number;
  showDeleteModal?: boolean;

  closeDeleteModal(): void;
  deleteProduct(): Promise<void>;
  handleShowDeleteModal(productToDelete: number): void;
}

export default class DeleteModal extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      this.props.showDeleteModal ?
      <div className="modal" id="deleteModal" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {"Vymazať produkt: " + (this.props.products[this.props.productToDelete] as IProduct).title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{
                "Naozaj chceš vymazať " + (this.props.products[this.props.productToDelete] as IProduct).title + "?"
              }</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal" onClick={this.props.closeDeleteModal}>Zatvoriť</button>
              <button
                type="button" className="btn btn-danger"
                onClick={this.props.deleteProduct}
              >Vymazať</button>
            </div>
          </div>
        </div>
      </div> : null
    );
  }
}
