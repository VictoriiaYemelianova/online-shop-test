import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../service/data.service';
import { IProduct, IServerModel } from '../data-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UserServiceService } from '../service/user-service.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  @ViewChild('deleteNotificationTemplate') deleteNotificationTemplate: TemplateRef<any>;

  private destroy: Subject<void> = new Subject<void>();

  public isAdmin = false;
  public categoryName: string;
  public productList: IProduct[];
  public updateForm: FormGroup;
  public infoMessage: string;
  public IsModalShow = false;
  public currentObj: IProduct;
  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;
  public currentTemplate: TemplateRef<any>;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.router.params
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        this.categoryName = res.name;

        this.getProducts();
      });

    this.router.data
    .pipe(takeUntil(this.destroy))
    .subscribe(data => {
      if (data.isAdmin) {
        this.isAdmin = true;
      }
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

  getProducts() {
    this.productService.get(this.categoryName).subscribe((res: IServerModel) => {
      if (res.success) {
        console.log(res.items);
        this.productList = res.items as IProduct[];
      }
    });
  }
  updateProduct(el: IProduct, event: Event) {
    event.preventDefault();
    event. stopPropagation();
    this.currentTemplate = this.updateTemplate;
    this.IsModalShow = true;
    this.currentObj = el;
    this.updateForm.controls.name.setValue(el.name);
    this.updateForm.controls.imgUrl.setValue(el.imgUrl);
    this.updateForm.controls.price.setValue(el.price);
  }

  onUpdateForm() {
    const formValue = this.updateForm.value;
    formValue.id = this.currentObj.id;
    this.productService.update(formValue).subscribe((res: IServerModel) => {
      if (res.success) {
        const newProductList: IProduct[] = this.productList.map((el: IProduct) => {
          if (el.id === res.items[0].id) {
            el = res.items[0] as IProduct;
          }
          return el;
        });
        this.productList = newProductList;
        this.infoMessage = 'Updated successfully!';
      } else {
        this.infoMessage = 'Error!';
      }
    });
  }

  deleteProduct(el: IProduct, event: Event) {
    event.preventDefault();
    event. stopPropagation();
    this.currentTemplate = this.deleteNotificationTemplate;
    this.currentObj = el;
    this.IsModalShow = true;
  }

  onDelete() {
    this.productService.delete(this.currentObj.id).subscribe((res: IServerModel) => {
      if (res.success) {
        const newProductList: IProduct[] = this.productList.filter((el: IProduct) => el.id !== this.currentObj.id);
        this.productList = newProductList;
      }
    });
    this.closeModal();
  }

  closeModal() {
    this.IsModalShow = false;
  }

  onBasket(product: IProduct, event) {
    event.preventDefault();
    event. stopPropagation();
    this.userService.addElToBuyList(product);
  }
}
