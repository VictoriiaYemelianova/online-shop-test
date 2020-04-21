import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { Observable } from 'rxjs';
import { IServerModel, ICategory } from '../data-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }

  get(): Observable<any> {
    return this.http.get(`${apiUrl}/categories`);
  }

  create( el: ICategory ) {
    return this.http.post(`${apiUrl}/categories/create`, el);
  }

  update( el: ICategory ) {
    return this.http.put(`${apiUrl}/categories/update`, el);
  }

  delete(id: string) {
    return this.http.delete(`${apiUrl}/categories/${id}`);
  }
}
