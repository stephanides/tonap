import * as React from "react";

import ProductFormBasicInfo from "./ProductFormBasicInfo";
import ProductFormTechInfo from "./ProductFormTechInfo";
import ProductFormSterilityInfo from "./ProductFormSterilityInfo";

interface IProps {
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

export default (props: IProps) => (
  <form onSubmit={(e) => { props.storeProduct(e); }}>
    <ProductFormBasicInfo />
    <ProductFormTechInfo />
    <ProductFormSterilityInfo />
    <div className="form-row align-items-center">
      <div className="col-12">
        <button type="submit" className="btn btn-primary mb-2">Pridať produkt</button>
      </div>
    </div>
  </form>
);
