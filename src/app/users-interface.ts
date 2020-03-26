export interface IUserServerModel {
  success: boolean;
  user?: IUser;
  message?: string;
}

export interface IUser {
  login: string;
  pass: string;
  _id: string;
}

export interface ICreateLogUser {
  login: string;
  pass: string;
}
