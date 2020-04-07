import { Injectable } from '@angular/core';
import { IUser, IUserServerModel, IProduct } from '../data-interface';
import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public logUser: IUser;
  public productToBuyList: BehaviorSubject<Array<IProduct>> = new BehaviorSubject([]);

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

  addElToBuyList(el: IProduct) {
    const currentList = this.productToBuyList.value;
    currentList.push(el);
    this.productToBuyList.next(currentList);
  }

  deleteProduct(el: IProduct) {
    const currentList = this.productToBuyList.value;
    const newList = currentList.filter(element => element !== el);
    this.productToBuyList.next(newList);
  }
}
