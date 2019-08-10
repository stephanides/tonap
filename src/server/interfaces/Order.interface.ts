interface IAddress {
  city?: string;
  psc?: string;
  street?: string;
}

export interface ISale {
  saleCode: String;
  salesPercentage: Number;
}

export default interface IOrder {
  // city: string;
  billingAddress?: object;
  // cancellation?: boolean;
  company?: string;
  dateModified?: string;
  deliveryAddress?: object;
  deliveryTime?: number;
  dic?: number;
  email: string;
  fullPrice?: number;
  ico?: number;
  message?: string;
  location?: string;
  name: string;
  nettPrice: number;
  orderNum: number;
  state: number;
  surname: string;
  shippingMethod?: number;
  shippingPrice?: number;
  paymentMethod?: number;
  paymenthPrice?: number;
  // street: string;
  phone: string;
  // psc: string;
  products: object[];
  sale: ISale;
}
