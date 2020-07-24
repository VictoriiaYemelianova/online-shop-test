import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

import { ProductService } from 'src/app/service/product.service';
import { IServerModel, ICategory, ISubcategory } from 'src/app/data-interface';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  public productForm: FormGroup;
  public categories: Array<ICategory>;
  public subcategories: any;
  public infoMessage: string;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.router.params
    .pipe(takeUntil(this.destroy));

    this.categoryService.fullCategories.subscribe(res => {
      this.categories = res;
      // this.subcategories = res[0].Categories;
    });

    this.productForm = new FormGroup({
      category: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onSubmitNewProduct() {
    const formValue = this.productForm.value;
    // this.productService.create(formValue, this.categoryName)
    //   .subscribe((res: IServerModel) => {
    //     if (res.success) {
    //       this.infoMessage = 'Created successfully!';
    //       this.productForm.reset();
    //     } else {
    //       this.infoMessage = 'Error!';
    //     }
    //   });
  }

  onChooseCategory(category: ICategory) {
    this.subcategories = category.Categories;
  }

}
