import { Injectable, ɵSWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICategory, IServerModel, ISubcategory } from '../data-interface';
import { UserServiceService } from './user-service.service';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private token: string;
  private category: ICategory;
  private subcategory: ISubcategory;
  public fullCategories: BehaviorSubject<Array<ICategory>> = new BehaviorSubject([]);
  public currentCategory: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor( private http: HttpClient, private userService: UserServiceService ) {
    this.token = this.userService.logUser.token;

    this.getCategories().subscribe();
  }

  setCurrentCategory(category: ICategory | ISubcategory) {
    this.currentCategory.next(category);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${apiUrl}/categories`).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          this.fullCategories.next(res.items as Array<ICategory>);
          if (this.category) {
            this.checkRebootPage(this.category, this.subcategory);
          }
        }
      })
    );
  }

  checkRebootPage(category, subcategory) {
    if (!this.fullCategories.value.length) {
      this.category = category;
      this.subcategory = subcategory;
      return;
    }

    let currentCategory;
    currentCategory = this.fullCategories.value.find(el => el.name === category);

    if (subcategory) {
      currentCategory = currentCategory.Categories.find(el => el.name === subcategory);
    }

    this.currentCategory.next(currentCategory);
  }

  create( el: ICategory | ISubcategory ) {
    return this.http.post(`${apiUrl}/categories/create`, el);
  }

  update( el: ICategory | ISubcategory ) {
    return this.http.put(`${apiUrl}/categories/update`, el);
  }

  delete(id: number) {
    return this.http.delete(`${apiUrl}/categories/${id}`);
  }
}
