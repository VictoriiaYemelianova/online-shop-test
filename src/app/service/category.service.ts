import { Injectable, ɵSWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { apiUrl } from '../constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICategory, IServerModel, ISubcategory } from '../data-interface';
import { UserServiceService } from './user-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private token: string;
  private category: ICategory;
  private subcategory: ISubcategory;
  public fullCategories: BehaviorSubject<Array<ICategory>> = new BehaviorSubject([]);
  public currentCategory: BehaviorSubject<any> = new BehaviorSubject(null);
  public showSubcategoryComponent: BehaviorSubject<boolean> = new BehaviorSubject(null);

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
    this.showSubcategoryComponent.next(true);

    if (subcategory) {
      this.showSubcategoryComponent.next(false);
      currentCategory = currentCategory.Categories.find(el => el.name === subcategory);
    }

    this.currentCategory.next(currentCategory);
  }

  create( el: ICategory | ISubcategory ) {
    return this.http.post(`${apiUrl}/categories/create`, el).pipe(
      map((res: IServerModel) => {
        if (res.success) {
          const currentFullCatefories = this.fullCategories.value;
          if ((res.items[0] as ISubcategory).subcategory === null) {
            currentFullCatefories.push(res.items[0] as ICategory);
          } else {
            currentFullCatefories.forEach((element: ICategory) => {
              if (element.id === (res.items[0] as ISubcategory).subcategory) {
                element.Categories.push(res.items[0] as ISubcategory);
              }
            });
          }
          this.fullCategories.next(currentFullCatefories);
        }

        return res;
      })
    );
  }

  update( el: ICategory | ISubcategory ) {
    return this.http.put(`${apiUrl}/categories/update`, el);
  }

  delete(id: number) {
    return this.http.delete(`${apiUrl}/categories/${id}`);
  }
}
