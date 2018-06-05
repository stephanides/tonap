import { IUser } from "./User.interface";
interface IPayload extends IUser {
  id?: string;
}

export default IPayload;
