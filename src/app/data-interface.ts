export interface IServerModel {
  success: boolean;
  items: Array<IUser | IProduct | ICategory>;
  message: string;
}

export interface IUserServerModel {
  success: boolean;
  items: IUser;
  message: string;
}

export interface IUser {
  _id?: string;
  login: string;
  pass: string;
  role?: string;
}

export interface IProductsServerModel {
  success: boolean;
  items?: Array<IProduct>;
  item?: IProduct;
}

export interface IProduct {
  _id?: string;
  name: string;
  imgUrl: string;
  price: number;
  idCategory: string;
}

export interface ICategoriesServerModel {
  success: boolean;
  items?: Array<ICategory>;
  item?: ICategory;
}

export interface ICategory {
  _id?: string;
  name: string;
  imgUrl: string;
}
