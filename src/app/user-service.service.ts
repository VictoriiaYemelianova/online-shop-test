import { Injectable } from '@angular/core';
import { IUserServerModel, IUser, ICreateLogUser } from './users-interface';
import { HttpClient} from '@angular/common/http';
import { apiUrl } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public logUser: IUser;

  constructor( private http: HttpClient ) { }

  loginUser(user: ICreateLogUser) {
    return this.http.post(`${apiUrl}/login`, user);
  }

  addUserInfo(user: IUser) {
    this.logUser = user;
  }

  addFailMessage() {}

  createUser(user: ICreateLogUser) {
    return this.http.post(`${apiUrl}/register`, user);
  }
}
