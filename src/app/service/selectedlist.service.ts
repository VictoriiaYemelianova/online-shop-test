import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct, IServerModel } from '../data-interface';
import { apiUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SelectedlistService {
  public selectedProduct: BehaviorSubject<Array<IProduct>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
    ) {}

  getSelectedProducts(userId) {
    return this.http.get(`${apiUrl}/selectedlist/${userId}`).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.selectedProduct.next(res.items as Array<IProduct>);
        }
      })
    );
  }
}
