export interface IUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  organization?: {
    _id?: string;
    name?: string;
  };
}
