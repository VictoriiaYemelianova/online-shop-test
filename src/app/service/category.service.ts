import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }

  create( el ) {
    return this.http.post(`${apiUrl}/categories/create`, el);
  }
}
