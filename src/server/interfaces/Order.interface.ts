export default interface IOrder {
  city: string;
  company?: string;
  email: string;
  ico?: number;
  name: string;
  orderNum: number;
  // surname: string;
  street: string;
  products: object[];
}
