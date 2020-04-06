import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../service/data.service';
import { IProduct, IProductsServerModel } from '../data-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UserServiceService } from '../service/user-service.service';

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
  public productName: string;
  public productList: IProduct[];
  public updateForm: FormGroup;
  public infoMessage: string;
  public IsModalShow = false;
  public currentObj: IProduct;
  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;
  public currentTemplate: TemplateRef<any>;

  constructor( private router: ActivatedRoute, private productService: DataService, private userService: UserServiceService ) { }

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

  deleteCategory(el: IProduct, event: Event) {
    event.preventDefault();
    event. stopPropagation();
    this.currentTemplate = this.deleteNotificationTemplate;
    this.currentObj = el;
    this.IsModalShow = true;
  }

  onDelete() {
    this.productService.delete(this.currentObj._id, this.productName).subscribe((res: IProductsServerModel) => {
      if (res.success) {
        const newProductList: IProduct[] = this.productList.filter((el: IProduct) => el._id !== this.currentObj._id);
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
