import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { RoutWrapperService } from './rout-wrapper.service';
import { IProduct, IFilter } from '../data-interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public sortBy = ['newest', 'lowest price', 'highest price'];
  public currentProducts: Array<IProduct>;
  public filtersObj: IFilter = {
    sortby: 'newest'
  };

  constructor(
    private productService: ProductService,
    private routWrapperService: RoutWrapperService
    ) {
    this.productService.currentProducts.subscribe((res: IProduct[]) => {
      if (res) {
        this.currentProducts = res;
        this.addFilter(null);
      }
    });
  }

  addFilter(obj) {
    if (obj) {
      this.filtersObj = {...obj};
    }

    this.sortProductsPrice();
    this.productService.setSortedProducts(this.currentProducts);
    this.routWrapperService.addQueryParams(this.filtersObj);
  }

  sortProductsPrice() {
    const priceFrom = this.filtersObj.pricefrome;
    const priceTo = this.filtersObj.priceto;

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
