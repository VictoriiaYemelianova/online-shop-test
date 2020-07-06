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
    return this.http.get(`${apiUrl}/products/${name}`);
  }

  create(el: IProduct, name: string) {
    return this.http.post(`${apiUrl}/${name}/create-product`, el);
  }

  update(el: IProduct) {
    return this.http.put(`${apiUrl}/products/update`, el);
  }

  delete(id: string) {
    return this.http.delete(`${apiUrl}/products/${id}`);
  }

  deleteAllProducts(name: string) {
    return this.http.delete(`${apiUrl}/products/${name}/delete`);
  }
}
