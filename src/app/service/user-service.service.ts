import { Injectable } from '@angular/core';
import { IUser, IServerModel, IProduct, IUserToken } from '../data-interface';
import { HttpClient} from '@angular/common/http';
import { url } from '../constants';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public logUser: IUserToken;
  public productToBuyList: BehaviorSubject<Array<IProduct>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.getItemLocalStorage('user', 'userBasket');
  }

  getItemLocalStorage(keyUser, keyBasket) {
    const user = localStorage.getItem(keyUser);
    const basket = localStorage.getItem(keyBasket);
    if (user) {
      this.logUser = JSON.parse(user);
    }

    if (basket) {
      const productStorage = JSON.parse(basket);
      this.productToBuyList.next(productStorage);
    }
  }

  loginUser(user: IUser): Observable<IServerModel> {
    return this.http.post(`${url}/login`, user).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.logUser = res.items[0] as IUserToken;
          localStorage.setItem('user', JSON.stringify(this.logUser));
          localStorage.setItem('userBasket', '');
        }
        return res;
      })
    );
  }

  createUser(user: IUser): Observable<IServerModel> {
    return this.http.post(`${url}/register`, user).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.logUser = res.items[0] as IUserToken;
        }
        return res;
      })
    );
  }

  logOut() {
    localStorage.clear();
    this.logUser = null;
    this.router.navigate(['']);
  }

  addElToBuyList(el: IProduct) {
    const currentList = this.productToBuyList.value;
    currentList.push(el);
    this.productToBuyList.next(currentList);
    localStorage.setItem('userBasket', JSON.stringify(currentList));
  }

  deleteOneProduct(el: IProduct) {
    const currentList = this.productToBuyList.value;
    const index = currentList.indexOf(el);
    currentList.splice(index, 1);
    this.productToBuyList.next(currentList);
    localStorage.setItem('userBasket', JSON.stringify(currentList));
  }

  addOneProduct(el: IProduct) {
    const currentList = this.productToBuyList.value;
    currentList.push(el);
    this.productToBuyList.next(currentList);
    localStorage.setItem('userBasket', JSON.stringify(currentList));
  }

  deleteProduct(el: IProduct) {
    const currentList = this.productToBuyList.value;
    const newList = currentList.filter(element => element !== el);
    this.productToBuyList.next(newList);
    if (newList.length !== 0) {
      localStorage.setItem('userBasket', JSON.stringify(currentList));
    } else {
      localStorage.setItem('userBasket', '');
    }
  }
}
