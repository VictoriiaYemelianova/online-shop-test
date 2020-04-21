import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

import { DataService } from 'src/app/service/data.service';
import { ProductService } from 'src/app/service/product.service';
import { IServerModel } from 'src/app/data-interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  public productForm: FormGroup;
  public categoryName: string;
  public infoMessage: string;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.router.params
    .pipe(takeUntil(this.destroy))
    .subscribe(res => this.categoryName = res.name);

    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onCancel() {
    this.location.back();
  }

  onSubmitNewProduct() {
    const formValue = this.productForm.value;
    console.log(formValue);
    this.productService.create(formValue, this.categoryName)
      .subscribe((res: IServerModel) => {
        if (res.success) {
          this.infoMessage = 'Created successfully!';
          this.productForm.reset();
        } else {
          this.infoMessage = 'Error!';
        }
      });
  }

}
