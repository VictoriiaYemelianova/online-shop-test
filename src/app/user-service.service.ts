import { Injectable } from '@angular/core';
import { IUser } from './data-interface';
import { HttpClient} from '@angular/common/http';
import { apiUrl } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public logUser: IUser;

  constructor( private http: HttpClient ) { }

  loginUser(user: IUser) {
    return this.http.post(`${apiUrl}/login`, user);
  }

  addUserInfo(user: IUser) {
    this.logUser = user;
  }

  createUser(user: IUser) {
    return this.http.post(`${apiUrl}/register`, user);
  }
}
