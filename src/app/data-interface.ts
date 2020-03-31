export interface IUserServerModel {
  success: boolean;
  user?: IUser;
  message?: string;
}

export interface IUser {
  login: string;
  pass: string;
  _id?: string;
}

export interface IProductsServerModel {
  success: boolean;
  items?: Array<IProduct>;
  item?: IProduct;
}

export interface IProduct {
  name: string;
  imgUrl: string;
  price: number;
  _entityType?: string;
  _creationDate?: string;
  _id?: string;
  _updatedDate?: string;
}

export interface ICategoriesServerModel {
  success: boolean;
  items?: Array<ICategory>;
  item?: ICategory;
}

export interface ICategory {
  name: string;
  imgUrl: string;
  _entityType?: string;
  _creationDate?: string;
  _id?: string;
  _updatedDate?: string;
}
