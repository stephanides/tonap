import * as React from "react";

interface IProps {
  products?: number;
  productEdit?: boolean;
  productNumber?: number;
}

export default (props: IProps) => (
  <div>
    <div className="form-row align-items-center">
      <div className="col-12">
        <h6>Základné informácie</h6>
      </div>
      <div className="col-6">
        <label className="sr-only" htmlFor="title">Názov Produktu</label>
        <input type="text" className="form-control mb-2" id="title" placeholder="Názov Produktu" required />
      </div>
      <div className="col-6">
        <label className="sr-only" htmlFor="title">Kategória</label>
        <select className="custom-select form-control mb-2" id="category" defaultValue={"0"}>
          <option value={0}>Kategórie</option>
          <option value={1}>Masťovky a Kelímky</option>
          <option value={2}>Petriho misky a odberníky</option>
          <option value={3}>Skúmavky</option>
        </select>
      </div>
    </div>
    <div className="form-row form-group">
      <div className="col-12">
        <label className="sr-only" htmlFor="description">Stručné Info.</label>
        <textarea className="form-control mb-2" id="description" placeholder="Stručné Info." required />
      </div>
    </div>
  </div>
);
