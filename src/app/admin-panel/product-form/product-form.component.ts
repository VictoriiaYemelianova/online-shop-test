import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProductsServerModel } from 'src/app/data-interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  public productForm: FormGroup;
  public productName: string;
  public infoMessage: string;

  constructor( private router: ActivatedRoute, private productService: DataService, private location: Location) { }

  ngOnInit(): void {
    this.router.params
    .pipe(takeUntil(this.destroy))
    .subscribe(res => this.productName = res.name);

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
    this.productService.create(formValue, this.productName)
      .subscribe((res: IProductsServerModel) => {
        if (res.success) {
          this.infoMessage = 'Created successfully!';
          this.productForm.reset();
        } else {
          this.infoMessage = 'Error!';
        }
      });
  }

}
