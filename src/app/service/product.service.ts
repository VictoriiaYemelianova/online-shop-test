import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { IProduct } from '../data-interface';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private token: string;

  constructor( private http: HttpClient, private userService: UserServiceService ) {
    this.token = this.userService.logUser.token;
  }

  get(name: string) {
    return this.http.get(`${apiUrl}/products/${name}`, {headers: {Authorization: 'Bearer ' + this.token}});
  }

  create(el: IProduct, name: string) {
    return this.http.post(`${apiUrl}/${name}/create-product`, el, {headers: {Authorization: 'Bearer ' + this.token}});
  }

  update(el: IProduct) {
    return this.http.put(`${apiUrl}/products/update`, el, {headers: {Authorization: 'Bearer ' + this.token}});
  }

  delete(id: string) {
    return this.http.delete(`${apiUrl}/products/${id}`, {headers: {Authorization: 'Bearer ' + this.token}});
  }

  deleteAllProducts(name: string) {
    return this.http.delete(`${apiUrl}/products/${name}/delete`);
  }
}
