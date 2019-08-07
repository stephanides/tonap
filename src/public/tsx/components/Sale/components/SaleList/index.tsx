import * as React from 'react';

interface IProps {
  removeSale(saleID: String): Promise<void>;

  sales?: object[];
}

const SaleList = (props: IProps) => {
  const { sales, removeSale } = props;

  return (
    <div className="w-100 border-top pt-3">
      { sales.length > 0 && [
        <h5 className="mb-3" key={0}>Zoznam zliav</h5>,
        <div className="d-flex justify-content-between mb-3" key={1}>
          <div className="w-50 border-bottom p-2 ">Zľavový kód</div>
          <div className="text-center w-50 border-left border-bottom p-2 ">Zľava v %</div>
        </div>
      ] }
      {
        sales.length > 0
          ?  sales.map((item) => {
            const { _id, saleCode, sale } = item as any;

            return (
              <div className="d-flex justify-content-between border-bottom" key={_id}>
                <div className="w-50 p-2 ">{saleCode}</div>
                <div className="d-flex justify-content-between w-50 p-2 ">
                  <div className="text-center w-50">{`${sale} %`}</div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeSale(_id)}
                  >
                    Odstrániť
                  </button>
                </div>
              </div>
            );
          }): <p className="text-center">Neboli nájdené žiadne zľavy</p>
      }
    </div>
  );
};

export default SaleList;
