import * as React from "react";

interface IProps {
  product?: object;

  handleProduct(product: object): void;
}

export default class ProductFormTechInfo extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      <div className="form-row align-items-center form-group">
        <div className="col-12">
          <h6>Technické parametre</h6>
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="length">Dĺžka</label>
          <input
            type="number"
            className="form-control mb-2" id="length" placeholder="Dĺžka v mm" min="10" max="100" required />
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="wide">Širka</label>
          <input
            type="number"
            className="form-control mb-2" id="wide" placeholder="Šír. v mm" min="10" max="100" required />
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="depth">Hĺbka</label>
          <input
            type="number"
            className="form-control mb-2" id="depth" placeholder="Hĺb. v mm" min="10" max="100"  required/>
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="weight">Objem</label>
          <input
            type="number"
            className="form-control mb-2" id="volume" placeholder="Obj. v ml" min="0" max="1000" required />
        </div>
        <div className="col-3">
          <label className="sr-only" htmlFor="weight">Váha</label>
          <input
            type="number"
            className="form-control mb-2" id="weight" placeholder="Váha v g" min="0" max="1000" required />
        </div>
      </div>
    );
  }
}
