export interface IServerModel {
  success: boolean;
  items: Array<IProduct | ICategory | IUserToken>;
  message: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUser {
  id?: string;
  login: string;
  pass: string;
  role?: string;
}

export interface ICategory {
  id?: string;
  name: string;
  imgUrl: string;
}

export interface IProduct {
  id?: string;
  name: string;
  imgUrl: string;
  price: number;
  idCategory?: string;
}
