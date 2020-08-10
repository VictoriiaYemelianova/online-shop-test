import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { IProduct, IServerModel } from '../data-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt, faPencilAlt, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserServiceService } from '../service/user-service.service';
import { ProductService } from '../service/product.service';
import { SelectedlistService } from '../service/selectedlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  @ViewChild('deleteNotificationTemplate') deleteNotificationTemplate: TemplateRef<any>;
  @Input() isSelected = false;

  private destroy: Subject<void> = new Subject<void>();

  public currentTemplate: TemplateRef<any>;
  public IsModalShow = false;
  public isAdmin = false;
  public infoMessage: string;
  public categoryName: string;
  public currentObj: IProduct;
  public productList: IProduct[];
  public selectedProductsList: Array<IProduct>;
  public updateForm: FormGroup;
  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;
  public faShoppingCart = faShoppingCart;
  public faHeart = faHeart;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private userService: UserServiceService,
    private selectedlistService: SelectedlistService
  ) { }

  ngOnInit(): void {
    this.router.params
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        this.categoryName = res.name;
      });

    this.router.data
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        if (data.isAdmin) {
          this.isAdmin = true;
        }
      });

    this.productService.currentSortedProductsList.subscribe((res: IProduct[]) => {
      if (res) {
        this.productList = res;
      }
    });

    this.selectedlistService.selectedProduct.subscribe((res: Array<IProduct>) => {
      if (res) {
        this.selectedProductsList = res;

        if (this.isSelected) {
          this.productList = this.selectedProductsList;
        }
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

  updateProduct(el: IProduct, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentTemplate = this.updateTemplate;
    this.IsModalShow = true;
    this.currentObj = el;
    this.updateForm.controls.name.setValue(el.name);
    this.updateForm.controls.imgUrl.setValue(el.imgUrl);
    this.updateForm.controls.price.setValue(el.price);
  }

  checkSelectedEl(arr) {
    return this.selectedProductsList.some(el => el.id === arr.id);
  }

  onUpdateForm() {
    const formValue = this.updateForm.value;
    formValue.id = this.currentObj.id;
    this.productService.update(formValue).subscribe((res: IServerModel) => {
      if (res.success) {
        const newProductList: IProduct[] = this.productList.map((el: IProduct) => {
          if (el.id === (res.items[0] as IProduct).id) {
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
    event.stopPropagation();
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
    event.stopPropagation();
    this.userService.addElToBuyList(product);
  }
}
