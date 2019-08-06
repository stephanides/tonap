import * as React from 'react';

interface IProps {
  sales?: object[];
}

const SaleList = (props: IProps) => {
  const { sales } = props;

  return (
    <div>
      { sales.length > 0 && <div>Zoznam zliav</div> }
      {
        sales.length > 0
          ?  sales.map((item) => {
            const { _id, saleCode, sale } = item as any;

            return <div key={_id}>{`${saleCode} ${sale}`}</div>;
          }): <p className="text-center">Neboli nájdené žiadne zľavy</p>
      }
    </div>
  );
};

export default SaleList;
