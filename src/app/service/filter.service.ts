import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { RoutWrapperService } from './rout-wrapper.service';
import { IProduct, IFilter } from '../data-interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public currentProducts: Array<IProduct> = [];
  public setFilters: IFilter = {};
  public sortBy = ['newest', 'lowest price', 'highest price'];
  public defaultValueSortBy = 'newest';

  constructor(
    private productService: ProductService,
    private routWrapperService: RoutWrapperService
    ) {
    this.setFilters.sortby = this.defaultValueSortBy;
    this.routWrapperService.getFiltersQeryParams();
    if (Object.keys(this.routWrapperService.currentQueryParams).length) {
      this.setFilters = {...this.routWrapperService.currentQueryParams};
    }

    this.productService.fullProducts.subscribe((res: IProduct[]) => {
      if (res.length) {
        this.currentProducts = res;
        this.addFilter();
      }
    });
  }

  addSorting(sortBy: string) {
    sortBy ? this.setFilters.sortby = sortBy : this.setFilters.sortby = this.setFilters.sortby;
    this.addFilter();
  }

  addPriceFilter(priceFrom: number, priceTo: number) {
    priceFrom ? this.setFilters.pricefrom = priceFrom : delete this.setFilters.pricefrom;
    priceTo ? this.setFilters.priceto = priceTo : delete this.setFilters.priceto;
    this.addFilter();
  }

  addFilter() {
    this.sortProductsPrice();
    this.productService.setSortedProducts(this.currentProducts);
    this.routWrapperService.addQueryParams(this.setFilters);
  }

  sortProductsPrice() {
    const priceFrom = this.setFilters.pricefrom;
    const priceTo = this.setFilters.priceto;

    if (priceFrom || priceTo) {
      this.currentProducts = this.currentProducts.filter((el: IProduct) => {
        if (priceFrom && priceTo) {
          if (el.price >= priceFrom && el.price <= priceTo) {
            return el;
          }
        } else if (priceFrom && el.price >= priceFrom) {
          return el;
        } else if (priceTo && el.price <= priceTo) {
          return el;
        }
      });
    }
  }
}
