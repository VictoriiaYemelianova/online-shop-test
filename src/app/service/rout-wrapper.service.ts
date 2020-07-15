import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutWrapperService {
  private routUrl: Array<string>;
  private currentUrl: string;
  public breadcrumbs: BehaviorSubject<Array<string>> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.routUrl = this.createArray(event.url);
        this.categoryService.checkRebootPage(this.routUrl[1], this.routUrl[2]);
        this.breadcrumbs.next(this.routUrl);
      }
    });
  }

  createArray(str) {
    if (str.lastIndexOf('?') !== -1) {
      str = str.substring(0, str.lastIndexOf('?'));
    }
    const newArray = str.split('/');
    newArray.splice(0, 2);
    return newArray;
  }

  addQueryParams(param: object) {
    this.router.navigate([],
    {
      relativeTo: this.route,
      queryParams: param,
      queryParamsHandling: 'merge'
    });
  }
}
