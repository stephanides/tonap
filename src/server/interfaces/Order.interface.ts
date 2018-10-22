export default interface IOrder {
  city: string;
  company?: string;
  dateModified?: string;
  deliveryTime?: number;
  email: string;
  ico?: number;
  message?: string;
  name: string;
  orderNum: number;
  state: number;
  street: string;
  phone: string;
  psc: string;
  products: object[];
}
