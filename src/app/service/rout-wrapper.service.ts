import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { BehaviorSubject } from 'rxjs';
import { IFilter } from '../data-interface';

@Injectable({
  providedIn: 'root'
})
export class RoutWrapperService {
  private routUrl: Array<string>;
  public currentQueryParams: IFilter;
  public breadcrumbs: BehaviorSubject<Array<string>> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routUrl = this.createArray(event.url);
        this.categoryService.checkRebootPage(this.routUrl[1], this.routUrl[2]);
        this.breadcrumbs.next(this.routUrl);
      }
    });
  }

  getFiltersQeryParams() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (Object.keys(res).length) {
        this.currentQueryParams = res;
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

  addQueryParams(params: IFilter) {
    this.router.navigate([],
    {
      relativeTo: this.activatedRoute,
      queryParams: params
    });
  }
}
