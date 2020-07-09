import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { ICategory, IServerModel } from '../data-interface';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-categoties',
  templateUrl: './categoties.component.html',
  styleUrls: ['./categoties.component.scss']
})
export class CategotiesComponent implements OnInit, OnDestroy {
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  @ViewChild('deleteNotificationTemplate') deleteNotificationTemplate: TemplateRef<any>;


  private destroy: Subject<void> = new Subject<void>();
  private token: string;

  public categoriesList: Array<ICategory>;
  public isAdmin = false;
  public IsModalShow = false;
  public onUpdateForm: FormGroup;
  public infoMessage: string;
  public currentObj: ICategory;

  public currentTemplate: TemplateRef<any>;

  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res: IServerModel) => {
      this.router.data
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        if (data.isAdmin) {
          this.isAdmin = true;
        }
      });
    });

    this.categoryService.fullCategories.subscribe((res: Array<ICategory>) => {
      this.categoriesList = res;
    });

    this.onUpdateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  setSubcategory(subcategory) {
    this.categoryService.setCurrentCategory(subcategory);
  }

  updateCategory(obj: ICategory, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentTemplate = this.updateTemplate;
    this.IsModalShow = true;
    this.currentObj = obj;
    this.onUpdateForm.controls.name.setValue(obj.name);
    this.onUpdateForm.controls.imgUrl.setValue(obj.imgUrl);
  }

  onUpdate() {
    const formValue = this.onUpdateForm.value;
    formValue.name = formValue.name.toLocaleLowerCase();
    formValue.id = this.currentObj.id;
    this.categoryService.update(formValue).subscribe((res: IServerModel) => {
      if (res.success) {
        const newCategoriesList: ICategory[] = this.categoriesList.map((el: ICategory) => {
          if (el.id === (res.items[0] as ICategory).id ) {
            el = res.items[0] as ICategory;
          }
          return el;
        });
        this.categoriesList = newCategoriesList;
        this.infoMessage = 'Updated successfully!';
      } else {
        this.infoMessage = 'Error!';
      }
    });
  }

  deleteCategory(obj: ICategory, event: Event) {
    event.preventDefault();
    event. stopPropagation();
    this.currentTemplate = this.deleteNotificationTemplate;
    this.currentObj = obj;
    this.IsModalShow = true;
  }

  onDelete() {
    this.deleteProducts();
    this.closeModal();
  }

  deleteProducts() {
    const currentProductName = this.currentObj.name.toLocaleLowerCase();
    this.productService.deleteAllProducts(currentProductName).subscribe((response: IServerModel) => {
      if (response.success) {
        this.categoryDelete();
      }
    });
  }

  categoryDelete() {
    this.categoryService.delete(this.currentObj.id).subscribe((res: IServerModel) => {
      if (res.success) {
        const newCategoriesList: ICategory[] = this.categoriesList.filter(el => el.id !== this.currentObj.id );
        this.categoriesList = newCategoriesList;
      }
    });
  }

  closeModal() {
    this.IsModalShow = false;
    this.infoMessage = '';
  }
}
