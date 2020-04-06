import { Injectable } from '@angular/core';
import { IUser, IUserServerModel } from '../data-interface';
import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public logUser: IUser;

  constructor( private http: HttpClient, private router: Router, ) { }

  loginUser(user: IUser): Observable<IUserServerModel> {
    return this.http.post(`${apiUrl}/login`, user).pipe(
      map((res: IUserServerModel) => {
        if (res.success) {
          this.logUser = res.user;
        }
        return res;
      })
    );
  }

  createUser(user: IUser): Observable<IUserServerModel> {
    return this.http.post(`${apiUrl}/register`, user).pipe(
      map((res: IUserServerModel) => {
        if (res.success) {
          this.logUser = res.user;
        }
        return res;
      })
    );
  }

  logOut() {
    this.logUser = null;
    this.router.navigate(['']);
  }
}
