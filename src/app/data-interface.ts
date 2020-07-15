export interface IServerModel {
  success: boolean;
  items: Array<IProduct | ICategory | IUserToken | ISubcategory>;
  message: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUser {
  id?: number;
  login?: string;
  email?: string;
  pass: string;
  role?: string;
}

export interface ICategory {
  id?: number;
  name: string;
  imgUrl: string;
  subcategory?: null;
  Categories?: Array<ISubcategory>;
}

export interface ISubcategory {
  id?: number;
  name: string;
  imgUrl: string;
  subcategory?: number;
}

export interface IProduct {
  id?: string;
  name: string;
  imgUrl: string;
  price: number;
  idCategory?: string;
  createdAt: string;
}

export interface IFilter {
  sortby?: string;
  pricefrome?: string;
  priceto?: string;
}
