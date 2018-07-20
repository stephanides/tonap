import * as React from "react";

interface IProps {
  temporaryProps?: any;
}

export default class Products extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return[
      <h2 className="mb-3" key={0}>Produkty</h2>,
      <h5 key={1}>Vložiť produkt</h5>,
      <div className="row" key={2}>
        <div className="col-12 mb-3">
          <form key={2}>
            <div className="form-row align-items-center">
              <div className="col-12">
                <h6>Základné informácie</h6>
              </div>
              <div className="col-12">
                <label className="sr-only" htmlFor="title">Názov Produktu</label>
                <input type="text" className="form-control mb-2" id="title" placeholder="Názov Produktu" />
              </div>
              <div className="col-12">
                <label className="sr-only" htmlFor="title">Stručné Info.</label>
                <textarea className="form-control mb-2" id="info" placeholder="Stručné Info." />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="col-12">
                <h6>Technické parametre</h6>
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="length">Dĺžka</label>
                <input
                  type="number" className="form-control mb-2" id="length" placeholder="Dĺžka v mm" min="10" max="100" />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="wide">Širka</label>
                <input
                  type="number" className="form-control mb-2" id="wide" placeholder="Širka v mm" min="10" max="100" />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="depth">Hĺbka</label>
                <input
                  type="number" className="form-control mb-2" id="depth" placeholder="Hĺbka v mm" min="10" max="100" />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="weight">Váha</label>
                <input
                  type="number" className="form-control mb-2" id="weight" placeholder="Váha v kg" min="0" max="1" />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="col-12">
                <h6>Varianty</h6>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="sterility">Sterilnosť</label>
                  <select id="sterility" className="form-control">
                    <option selected>Vybrať</option>
                    <option value={1}>Sterilné</option>
                    <option value={2}>Nesterilné</option>
                  </select>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="sterility">Počet kusov v balení</label>
                  <select id="sterility" className="form-control">
                    <option selected>Vybrať</option>
                    <option value={1}>1 ks</option>
                    <option value={20}>20 ks</option>
                  </select>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="sterility">Veľkosť balenia</label>
                  <select id="sterility" className="form-control">
                    <option selected>Vybrať</option>
                    <option value={500}>500 ks</option>
                    <option value={100}>100 ks</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="col-12">
                <button type="submit" className="btn btn-primary mb-2">Pridať produkt</button>
              </div>
            </div>
          </form>
        </div>
      </div>,
      <h5 key={3}>Zoznam produktov</h5>,
    ];
  }
}
