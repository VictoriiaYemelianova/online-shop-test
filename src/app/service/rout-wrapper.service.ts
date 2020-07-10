import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CategoryService } from './category.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutWrapperService {
  private routUrl: Array<string>;
  public breadcrumbs: BehaviorSubject<Array<string>> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routUrl = this.createArray(event.url);
        this.categoryService.checkRebootPage(this.routUrl[1], this.routUrl[2]);
        this.breadcrumbs.next(this.routUrl);
      }
    });
  }

  createArray(str) {
    const newArray = str.split('/');
    newArray.splice(0, 2);
    return newArray;
  }
}
