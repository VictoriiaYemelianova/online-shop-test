import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class RoutWrapperService {
  private routUrl: Array<string>;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.routUrl = this.router.url.split('/');
    this.routUrl.splice(0, 2);
    console.log(this.routUrl[this.routUrl.length - 1]);
    console.log(this.categoryService.fullCategories.value.length);

    if (this.routUrl.length === 2) {
      this.getAllProductsInCategory();
    }
  }

  getAllProductsInCategory() {
    if (!this.categoryService.fullCategories.value.length) {
      this.categoryService.getCategories().subscribe();
    }

    this.categoryService.fullCategories.subscribe(res => {
      const category = res.find((el) => el.name === this.routUrl[this.routUrl.length - 1]);
      console.log(category);
      this.categoryService.setCurrentCategory(category);
    });

    this.categoryService.currentCategory.subscribe(resp => {
      if (resp) {
        this.productService.getFullProducts(resp.id).subscribe(r => console.log(r));
      }
    });
  }

}
