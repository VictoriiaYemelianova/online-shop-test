import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { IProduct, IProductsServerModel } from '../data-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  public isAdmin = false;
  public productName: string;
  public productList: IProduct[];
  public updateForm: FormGroup;
  public infoMessage: string;
  public IsModalShow = false;
  public currentObj: IProduct;
  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;

  constructor( private router: ActivatedRoute, private productService: DataService ) { }

  ngOnInit(): void {
    this.router.params
      .pipe(takeUntil(this.destroy))
      .subscribe(res => this.productName = res.name);

    this.productService.get(this.productName).subscribe((res: IProductsServerModel) => {
      if (res.success) {
        console.log(res.items);
        this.productList = res.items;
      }

      this.router.data
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        if (data.isAdmin) {
          this.isAdmin = true;
        }
      });
    });

    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  updateProduct(el: IProduct) {
    this.IsModalShow = true;
    this.currentObj = el;
    this.updateForm.controls.name.setValue(el.name);
    this.updateForm.controls.imgUrl.setValue(el.imgUrl);
    this.updateForm.controls.price.setValue(el.price);
  }

  onUpdateForm() {
    const formValue = this.updateForm.value;
    formValue._id = this.currentObj._id;
    this.productService.update(formValue, this.productName).subscribe((res: IProductsServerModel) => {
      if (res.success) {
        const newProductList: IProduct[] = this.productList.map((el: IProduct) => {
          if (el._id === res.item._id) {
            el = res.item;
          }
          return el;
        });
        this.productList = newProductList;
        this.infoMessage = 'Updated successfully!';
        this.updateForm.reset();
      } else {
        this.infoMessage = 'Error!';
      }
    });
  }

  deleteCategory(id: string) {
    alert('Dalete?');
    this.productService.delete(id, this.productName).subscribe((res: IProductsServerModel) => {
      if (res.success) {
        const newProductList: IProduct[] = this.productList.filter((el: IProduct) => el._id !== id);
        this.productList = newProductList;
      }
    });
  }

  onCancel() {
    this.updateForm.reset();
    this.IsModalShow = false;
  }
}
