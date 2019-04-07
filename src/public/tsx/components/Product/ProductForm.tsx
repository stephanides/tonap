import * as React from "react";

import ProductFormBasicInfo from "./ProductFormBasicInfo";
import ProductFormTechInfo from "./ProductFormTechInfo";
// import ProductFormSterilityInfo from "./ProductFormSterilityInfo";
import ProductVariant from "./ProductVariant";
import IProduct from "../../interfaces/Product.interface";

interface IProps {
  product?: IProduct;
  products?: object[];
  productEdit?: boolean;
  productNumber?: number;

  handleProductUpdate?: (e: React.FormEvent<HTMLElement>) => Promise<void>;
  handleProduct(product: object): void;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

export default class ProductForm extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);

    this.handleInsertRow = this.handleInsertRow.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
  }
  handleInsertRow(e) {
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
    btnAdd.addEventListener('click', this.handleInsertRow);
    btnRemove.addEventListener('click', this.handleRemoveRow);
  
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
  }

  handleRemoveRow(e) {
    const formRowsContainer = e.currentTarget.closest(".variation-form-rows");
    const rowContainer = e.currentTarget.closest(".row");

    if(formRowsContainer.querySelectorAll('.row').length > 1) {
      formRowsContainer.removeChild(rowContainer);
    }
  }

  public render() {
    return(
      <form onSubmit={(e) => {
        if (this.props.productEdit) {
          this.props.handleProductUpdate(e);
        } else {
          this.props.storeProduct(e);
        }
      }}>
        <ProductFormBasicInfo
          product={this.props.product}
          products={this.props.products}
          productNumber={this.props.productNumber}
          handleProduct={this.props.handleProduct}
        />
        <ProductFormTechInfo
          product={this.props.product}
          handleProduct={this.props.handleProduct}
        />
        <h6>Variant</h6>
        <div className="variation-form-rows">
          <ProductVariant
            handleProduct={this.props.handleProduct}
            product={this.props.product}
            productEdit={this.props.productEdit}
          />
          {
            this.props.product.variant && this.props.product.variant.length > 1 ? (
              this.props.product.variant.map((item, i) => {
                return (
                  i > 0 ? (
                    <div className="row" key={i}>
                      <div className="col">
                        <input
                          type="text"
                          className="variation title mb-2"
                          placeholder="Názov variantu"
                          onChange={(e) => {
                            const newProduct = this.props.product;
  
                            newProduct.variant[i].title = e.currentTarget.value;
  
                            this.props.handleProduct(newProduct);
                          }}
                          value={
                            this.props.product.variant ?
                            (
                              this.props.product.variant[i] ? this.props.product.variant[i].title : ""
                            ) : ""
                          }
                        />
                        <div className="clear" />
                        <input
                          type="number"
                          className="variation price-min mb-2"
                          placeholder="Min. cena"
                          onChange={(e) => {
                            this.props.product.variant[i].priceMin = e.currentTarget.value;
                            
                            this.props.handleProduct(this.props.product);
                          }}
                          value={
                            this.props.product.variant ?
                            (
                              this.props.product.variant[i] ? this.props.product.variant[i].priceMin : ""
                            ) : ""
                          }
                        />
                        <input
                          type="number"
                          className="variation price-med mb-2"
                          placeholder="Med. cena"
                          onChange={(e) => {
                            this.props.product.variant[i].priceMed = e.currentTarget.value;
                            
                            this.props.handleProduct(this.props.product);
                          }}
                          value={
                            this.props.product.variant ?
                            (
                              this.props.product.variant[i] ? this.props.product.variant[i].priceMed : ""
                            ) : ""
                          }
                        />
                        <input
                          type="number"
                          className="variation price-max mb-2"
                          placeholder="Max. cena"
                          onChange={(e) => {
                            this.props.product.variant[i].priceMax = e.currentTarget.value;
                            
                            this.props.handleProduct(this.props.product);
                          }}
                          value={
                            this.props.product.variant && this.props.product.variant.length > 0 ?
                            (
                              this.props.product.variant[i] ? this.props.product.variant[i].priceMax : ""
                            ) : ""
                          }
                        />
                        <div className="clear" />
                        <input
                          type="number"
                          className="variation sack-count mb-2"
                          placeholder="Poč. kus. sáčok"
                          onChange={(e) => {
                            this.props.product.variant[i].sackCount = e.currentTarget.value;
                            
                            this.props.handleProduct(this.props.product);
                          }}
                          value={
                            this.props.product.variant && this.props.product.variant.length > 0 ?
                            (
                              this.props.product.variant[i] ? this.props.product.variant[i].sackCount : ""
                            ) : ""
                          }
                        />
                        <input
                          type="number"
                          className="variation box-count mb-2"
                          placeholder="Poč. kus. krabica"
                          onChange={(e) => {
                            this.props.product.variant[i].boxCount = e.currentTarget.value;
                            
                            this.props.handleProduct(this.props.product);
                          }}
                          value={
                            this.props.product.variant && this.props.product.variant.length > 0 ?
                            (
                              this.props.product.variant[i] ? this.props.product.variant[i].boxCount : ""
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
                              this.props.product.variant[i].inStock = e.currentTarget.checked;
                              
                              this.props.handleProduct(this.props.product);
                            }}
                            checked={this.props.product.variant ? this.props.product.variant[i].inStock : true}
                          />
                        </div>
                        <button type="button" className="btn btn-secondary ml-1" onClick={this.handleInsertRow}>+</button>
                        <button type="button" className="btn btn-secondary ml-1" onClick={this.handleRemoveRow}>-</button>
                      </div>
                    </div>
                  ) : null
                );
              })
            ) : null
          }
        </div>

        {
          /*
          <ProductFormSterilityInfo
            product={this.props.product}
            handleProduct={this.props.handleProduct}
          />
          */
        }
        <div className="form-row align-items-center mt-2">
          <div className="col-12">
            <button type="submit" className="btn btn-primary mb-2">
              {
                this.props.productEdit ? "Upraviť produkt" : "Pridať produkt"
              }
            </button>
          </div>
        </div>
        <style>
          {`
            .checkbox-line { max-width: 195px; display: inline-block; }
          `}
        </style>
      </form>
    );
  }
}
