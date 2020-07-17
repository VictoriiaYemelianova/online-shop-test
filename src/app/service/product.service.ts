import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { IProduct, IServerModel, ICategory, ISubcategory } from '../data-interface';
import { UserServiceService } from './user-service.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private token: string;
  public fullProducts: BehaviorSubject<Array<IProduct>> = new BehaviorSubject([]);
  public currentSortedProductsList: BehaviorSubject<Array<IProduct>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private userService: UserServiceService,
    private categoryService: CategoryService,
    ) {
    this.token = this.userService.logUser.token;

    this.categoryService.currentCategory.subscribe((res) => {
      if (res) {
        if (res.Categories) {
          this.getFullProducts(res.id).subscribe();
        } else {
          this.getSubcategoryProducts(res.id).subscribe();
        }
      }
    });
  }

  getFullProducts(id: number) {
    return this.http.get(`${apiUrl}/parent-category-products/${id}`).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.fullProducts.next(res.items as IProduct[]);
        }
      })
    );
  }

  getSubcategoryProducts(id: number) {
    return this.http.get(`${apiUrl}/subcategory-products/${id}`).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.fullProducts.next(res.items as IProduct[]);
        }
      })
    );
  }

  setSortedProducts(prosucts: IProduct[]) {
    this.currentSortedProductsList.next(prosucts);
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
