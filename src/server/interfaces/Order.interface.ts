export default interface IOrder {
  // city: string;
  billingAddress?: object;
  company?: string;
  dateModified?: string;
  deliveryAddress?: object;
  deliveryTime?: number;
  email: string;
  ico?: number;
  message?: string;
  name: string;
  orderNum: number;
  state: number;
  // street: string;
  phone: string;
  // psc: string;
  products: object[];
}

interface IAddress {
  city?: string;
  psc?: string;
  street?: string;
}
