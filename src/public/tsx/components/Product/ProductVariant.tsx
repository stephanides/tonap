import * as React from "react";
import IProduct from "../../interfaces/Product.interface";
import ProductCreate from "./ProductCreate";

interface IProps {
  product: IProduct;
  handleProduct(product: object): void;
}

export default ({ product, handleProduct }: IProps) => {
  // const { variant } = product;

  // console.log(product.variant);

  const handleInsertRow = (e) => {
    const formRowsContainer = e.target.closest('.variation-form-rows');
    const fragment = document.createDocumentFragment();
    const randomIdforInStock = new Date().getTime();
  
    const row = document.createElement('div');
    const col = document.createElement('div');
  
    const inputTitle = document.createElement('input');
    const inputPriceMin = document.createElement('input');
    const inputPriceMed = document.createElement('input');
    const inputPriceMax = document.createElement('input');
    const divider = document.createElement('div');
    const divider1 = document.createElement('div');
    const inputCountSack = document.createElement('input');
    const inputCountBox = document.createElement('input');
    const checkboxWrapper = document.createElement('div');
    const labelForInStock = document.createElement('label');
    const inputInStock = document.createElement('input');
    const btnAdd = document.createElement('button');
    const btnRemove = document.createElement('button');
  
    row.className = "row";
    col.className = "col";

    btnAdd.type = "button";
    btnAdd.className = "btn btn-secondary";
    btnAdd.innerHTML = "+";
    btnRemove.type = "button";
    btnRemove.className = "btn btn-secondary ml-1";
    btnRemove.innerHTML = "-";
    btnAdd.addEventListener('click', handleInsertRow);
    btnRemove.addEventListener('click', handleRemoveRow);
  
    inputTitle.type = "text";
    inputTitle.className = "variation title mb-2"
    inputTitle.placeholder = "Názov variantu";
    
    inputPriceMin.type = "number";
    inputPriceMin.className = "variation price-min mb-2";
    inputPriceMin.placeholder = "Min. cena";
    inputPriceMin.step = "0.01";
  
    inputPriceMed.type = "number";
    inputPriceMed.className = "variation price-med mb-2";
    inputPriceMed.placeholder = "Med. cena";
    inputPriceMed.step = "0.01";
  
    inputPriceMax.type = "number";
    inputPriceMax.className = "variation price-max mb-2";
    inputPriceMax.placeholder = "Max. cena";
    inputPriceMax.step = "0.01";

    inputCountSack.type = "number";
    inputCountSack.className = "variation sack-count mb-2";
    inputCountSack.placeholder = "Poč. kus. sáčok";

    inputCountBox.type = "number";
    inputCountBox.className = "variation box-count mb-2";
    inputCountBox.placeholder = "Poč. kus. krabica";

    checkboxWrapper.className = "checkbox-line mr-2";

    labelForInStock.htmlFor = `itemInStock-${randomIdforInStock}`;
    labelForInStock.innerText = "Skladom";

    inputInStock.type = "checkbox";
    inputInStock.className = "variation inStock mb-2";
    inputInStock.defaultChecked = true;
    inputInStock.id = `itemInStock-${randomIdforInStock}`;
  
    divider.className = "clear";
    divider1.className = "clear";

    checkboxWrapper.appendChild(labelForInStock);
    checkboxWrapper.appendChild(inputInStock);
  
    col.appendChild(inputTitle);
    col.appendChild(divider);
    col.appendChild(inputPriceMin);
    col.appendChild(inputPriceMed);
    col.appendChild(inputPriceMax);
    col.appendChild(divider1);
    col.appendChild(inputCountSack);
    col.appendChild(inputCountBox);
    col.appendChild(checkboxWrapper);
    col.appendChild(inputInStock);
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
            step="0.01"
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
            step="0.01"
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
            step="0.01"
            className="variation price-max mb-2"
            placeholder="Max. cena"
            onChange={(e) => {
              product.variant[0].priceMax = e.currentTarget.value;
              
              handleProduct(product);
            }}
            value={
              product.variant && product.variant.length > 0 ?
              (
                product.variant[0] ? product.variant[0].priceMax : ""
              ) : ""
            }
          />
          <div className="clear" />
          <input
            type="number"
            className="variation sack-count mb-2"
            placeholder="Poč. kus. sáčok"
            onChange={(e) => {
              product.variant[0].sackCount = e.currentTarget.value;
              
              handleProduct(product);
            }}
            value={
              product.variant && product.variant.length > 0 ?
              (
                product.variant[0] ? product.variant[0].sackCount : ""
              ) : ""
            }
          />
          <input
            type="number"
            className="variation box-count mb-2"
            placeholder="Poč. kus. krabica"
            onChange={(e) => {
              product.variant[0].boxCount = e.currentTarget.value;
              
              handleProduct(product);
            }}
            value={
              product.variant && product.variant.length > 0 ?
              (
                product.variant[0] ? product.variant[0].boxCount : ""
              ) : ""
            }
          />
          <div className="checkbox-line mr-2">
            <label htmlFor="itemInStock">Skladom</label>
            <input
              type="checkbox"
              className="variation inStock mb-2"
              id="itemInStock"
              onChange={(e) => {
                product.variant[0].inStock = e.currentTarget.checked;
                
                handleProduct(product);
              }}
              checked={product.variant ? product.variant[0].inStock : true}
            />
          </div>
          <button type="button" className="btn btn-secondary" onClick={handleInsertRow}>+</button>
        </div>
      </div>
      <style>
        {`
          .checkbox-line { max-width: 195px; display: inline-block; }
        `}
      </style>
    </div>
  );
};