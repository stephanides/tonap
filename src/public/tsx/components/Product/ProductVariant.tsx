import * as React from "react";
import IProduct from "../../interfaces/Product.interface";
import ProductCreate from "./ProductCreate";

interface IProps {
  product: IProduct;
  handleProduct(product: object): void;
}

export default ({ product, handleProduct }: IProps) => {
  // const { variant } = product;

  // console.log(variant);

  const handleInsertRow = (e) => {
    const formRowsContainer = e.target.closest('.variation-form-rows');
    const fragment = document.createDocumentFragment();
  
    const row = document.createElement('div');
    const col = document.createElement('div');
  
    const inputTitle = document.createElement('input');
    const inputPriceMin = document.createElement('input');
    const inputPriceMed = document.createElement('input');
    const inputPriceMax = document.createElement('input');
    const divider = document.createElement('div');
    const btnAdd = document.createElement('button');
    const btnRemove = document.createElement('button');
  
    row.className = "row";
    col.className = "col";

    btnAdd.type = "button";
    btnAdd.innerHTML = "+";
    btnRemove.type = "button";
    btnRemove.innerHTML = "-";
    btnAdd.addEventListener('click', handleInsertRow);
    btnRemove.addEventListener('click', handleRemoveRow);
  
    inputTitle.type = "text";
    inputTitle.className = "variation title"
    inputTitle.placeholder = "Názov variantu";
    
    inputPriceMin.type = "number";
    inputPriceMin.className = "variation price-min";
    inputPriceMin.placeholder = "Min. cena";
  
    inputPriceMed.type = "number";
    inputPriceMed.className = "variation price-med";
    inputPriceMed.placeholder = "Med. cena";
  
    inputPriceMax.type = "number";
    inputPriceMax.className = "variation price-max";
    inputPriceMax.placeholder = "Max. cena";
  
    divider.className = "clear";
  
    col.appendChild(inputTitle);
    col.appendChild(divider);
    col.appendChild(inputPriceMin);
    col.appendChild(inputPriceMed);
    col.appendChild(inputPriceMax);
    col.appendChild(btnAdd);
    col.appendChild(btnRemove);
  
    row.appendChild(col);
    fragment.appendChild(row);
    formRowsContainer.appendChild(fragment);
  };

  const handleRemoveRow = (e) => {
    const formRowsContainer = e.currentTarget.closest(".variation-form-rows");
    const rowContainer = e.currentTarget.closest(".row");

    formRowsContainer.removeChild(rowContainer);
  };

  return (
    <div className="variation-form-rows">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="variation title mb-2"
            placeholder="Názov variantu"
            onChange={(e) => {
              product.variant[0].title = e.currentTarget.value;
              
              handleProduct(product);
            }}
            value={
              product.variant ?
              (
                product.variant[0] ? product.variant[0].title : ""
              ) : ""
            }
          />
          <div className="clear" />
          <input
            type="number"
            className="variation price-min mb-2"
            placeholder="Min. cena"
            onChange={(e) => {
              product.variant[0].priceMin = e.currentTarget.value;
              
              handleProduct(product);
            }}
            value={
              product.variant ?
              (
                product.variant[0] ? product.variant[0].priceMin : ""
              ) : ""
            }
          />
          <input
            type="number"
            className="variation price-med mb-2"
            placeholder="Med. cena"
            onChange={(e) => {
              product.variant[0].priceMed = e.currentTarget.value;
              
              handleProduct(product);
            }}
            value={
              product.variant ?
              (
                product.variant[0] ? product.variant[0].priceMed : ""
              ) : ""
            }
          />
          <input
            type="number"
            className="variation price-max mb-2"
            placeholder="Max. cena"
            onChange={(e) => {
              product.variant[0].priceMax = e.currentTarget.value;
              
              handleProduct(product);
            }}
            value={
              product.variant ?
              (
                product.variant[0] ? product.variant[0].priceMax : ""
              ) : ""
            }
          />
          <button type="button" className="primary" onClick={handleInsertRow}>+</button>
        </div>
      </div>
    </div>
  );
};