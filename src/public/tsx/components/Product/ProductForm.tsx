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
        <ProductVariant
          handleProduct={this.props.handleProduct}
          product={this.props.product}
        />
        {
          this.props.product.variant && this.props.product.variant.length > 1 ? (
            this.props.product.variant.map((item, i) => {
              return (
                i > 0 ? (
                  <div className="variation-form-rows" key={i}>
                    <div className="row">
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
                              this.props.product.variant[0] ? this.props.product.variant[0].priceMed : ""
                            ) : ""
                          }
                        />
                        <input
                          type="number"
                          className="variation price-max mb-2"
                          placeholder="Max. cena"
                          onChange={(e) => {
                            this.props.product.variant[0].priceMax = e.currentTarget.value;
                            
                            this.props.handleProduct(this.props.product);
                          }}
                          value={
                            this.props.product.variant && this.props.product.variant.length > 0 ?
                            (
                              this.props.product.variant[0] ? this.props.product.variant[0].priceMax : ""
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
                            this.props.product.variant[0].boxCount = e.currentTarget.value;
                            
                            this.props.handleProduct(this.props.product);
                          }}
                          value={
                            this.props.product.variant && this.props.product.variant.length > 0 ?
                            (
                              this.props.product.variant[0] ? this.props.product.variant[0].boxCount : ""
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
                              this.props.product.variant[0].inStock = e.currentTarget.checked;
                              
                              this.props.handleProduct(this.props.product);
                            }}
                            checked={this.props.product.variant ? this.props.product.variant[0].inStock : true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              );
            })
          ) : null
        } 
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
      </form>
    );
  }
}
