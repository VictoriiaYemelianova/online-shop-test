import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ICategory, ISubcategory } from '../data-interface';

@Injectable({
  providedIn: 'root'
})
export class RoutWrapperService {
  private routUrl: Array<string>;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routUrl = this.createArray(event.url);
        this.categoryService.checkRebootPage(this.routUrl[1], this.routUrl[2]);
      }
    });
  }

  createArray(str) {
    const newArray = str.split('/');
    newArray.splice(0, 2);
    return newArray;
  }
}
