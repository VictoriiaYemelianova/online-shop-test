import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { IProduct } from '../data-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient ) {}

  get(name: string) {
    return this.http.get(`${apiUrl}/products/${name}`);
  }

  create(el: IProduct, name: string) {
    return this.http.post(`${apiUrl}/${name}/create-product`, el);
  }

  update() {}

  delete() {}
}
