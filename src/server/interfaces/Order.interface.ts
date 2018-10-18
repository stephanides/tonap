export default interface IOrder {
  city: string;
  company?: string;
  deliveryTime?: number;
  email: string;
  ico?: number;
  name: string;
  orderNum: number;
  state: number;
  street: string;
  products: object[];
}
