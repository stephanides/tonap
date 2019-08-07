import * as React from 'react';
import SaleList from './components/SaleList';

interface IProps {
  sales?: object[];

  submitSale(e:React.FormEvent<HTMLElement>, url?: string): Promise<void>;
  getSales(): Promise<void>;
  removeSale(saleID: String): Promise<void>;
}

const SaleComponent = (props: IProps) => {
  const { getSales, submitSale, sales, removeSale } = props;

  if (sales.length === 0) {
    getSales();
  }

  return (
    <div className="pt-3">
      <form className="m-auto w-75" onSubmit={submitSale}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="saleCode">Zľavový kód</label>
              <input type="text" className="form-control" id="saleCode" placeholder="Vložte zľavový kód" required />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="sale">Zľava</label>
              <div className="input-group">
                <select className="form-control" id="sale">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                  <option value="60">60</option>
                  <option value="65">65</option>
                  <option value="70">70</option>
                  <option value="75">75</option>
                  <option value="80">80</option>
                  <option value="80">85</option>
                  <option value="90">90</option>
                  <option value="95">95</option>
                  <option value="100">100</option>
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-end">
            <button
              className="btn btn-primary mb-3"
              type="submit"
            >
              Uložiť
            </button>
          </div>
        </div>
      </form>
      {''}
      <SaleList
        sales={sales}
        removeSale={removeSale}
      />
    </div>
  );
};

export default SaleComponent;
