import * as React from "react";

export default class ProductFormSterilityInfo extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  public render() {
    return(
        <div className="form-row align-items-center form-group" ref={"sterileWrapper"}>
          <div className="col-12">
            <h6>Sterilita</h6>
          </div>
          <div className="col-12">
            <div className="row form-group">
              <div className="col-auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={0} id="sterile"
                    onClick={() => { this.handleCheckBox(0, this.refs.sterile); }} />
                  <label className="form-check-label" htmlFor="sterile">Sterilné</label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox" value={1} id="notSterile"
                    onClick={() => { this.handleCheckBox(1, this.refs.notSterile); }} />
                  <label className="form-check-label" htmlFor="notSterile">Nesterilné</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6" ref={"sterile"}>
            <h6>Počet ks. sterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMinCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMinCount" placeholder="Min." min="1" max="1000" required disabled />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMaxCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMaxCount" placeholder="Max." min="1" max="2000" required disabled />
              </div>
            </div>
            <h6>Balenie sterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMinPackageCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMinPackageCount" placeholder="Min." min="1" max="1000" required disabled />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="sterileProductMaxPackageCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="sterileProductMaxPackageCount" placeholder="Max." min="1" max="10000" required disabled />
              </div>
            </div>
          </div>
          <div className="col-6" ref={"notSterile"}>
            <h6>Počet ks. nesterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMinCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMinCount" placeholder="Min." min="1" max="1000" required disabled />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMaxCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMaxCount" placeholder="Max." min="1" max="2000" required disabled />
              </div>
            </div>
            <h6>Balenie nesterilné:</h6>
            <div className="row">
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMinPackageCount">Min.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMinPackageCount" placeholder="Min." min="1" max="1000" required disabled />
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="notSterileProductMaxPackageCount">Max.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="notSterileProductMaxPackageCount" placeholder="Max." min="1" max="10000" required disabled />
              </div>
            </div>
          </div>
        </div>
    );
  }

  private handleCheckBox(n: number, ref: any): void {
    const checkBox: HTMLInputElement = n > 0 ?
    (this.refs.sterileWrapper as any).querySelector("#notSterile") :
    (this.refs.sterileWrapper as any).querySelector("#sterile");
    const inputs: NodeListOf<HTMLInputElement> = ref.querySelectorAll("input");

    for (const input of inputs as any) {
      if (checkBox.checked) {
        input.disabled = false;
      } else {
        input.disabled = true;
      }
    }
  }
}
