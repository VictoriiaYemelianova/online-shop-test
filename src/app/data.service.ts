import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { apiUrl } from './constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  get( entity: string ) {
    return this.http.post(`${apiUrl}/${entity}/get`, null);
  }

  create( el, entity: string ) {
    return this.http.post(`${apiUrl}/${entity}/create`, el);
  }

  update( el, entity: string ) {
    return this.http.post(`${apiUrl}/${entity}/update`, el);
  }

  delete( id: string, entity: string ) {
    return this.http.get(`${apiUrl}/${entity}/delete/${id}`);
  }
}
