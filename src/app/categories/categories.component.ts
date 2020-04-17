import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../service/data.service';
import { CategoryService } from '../service/category.service';
import { ICategory, IServerModel, IProductsServerModel } from '../data-interface';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categoties',
  templateUrl: './categoties.component.html',
  styleUrls: ['./categoties.component.scss']
})
export class CategotiesComponent implements OnInit, OnDestroy {
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  @ViewChild('deleteNotificationTemplate') deleteNotificationTemplate: TemplateRef<any>;


  private destroy: Subject<void> = new Subject<void>();

  public categoriesList: ICategory[];
  public isAdmin = false;
  public IsModalShow = false;
  public onUpdateForm: FormGroup;
  public infoMessage: string;
  public currentObj: ICategory;
  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;
  public currentTemplate: TemplateRef<any>;

  constructor(private router: ActivatedRoute, private categoriesService: DataService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.get().subscribe((res: IServerModel) => {
      if (res.success) {
        console.log(res)
        this.categoriesList = res.items as ICategory[];
      }

      this.router.data
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        if (data.isAdmin) {
          this.isAdmin = true;
        }
      });
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
          // const firstEl = res.items[0] as ICategory;
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
    console.log(this.currentObj.name);
  }

  onDelete() {
    this.categoriesService.delete(this.currentObj.id , 'categories').subscribe((res: IServerModel) => {
      if (res.success) {
        const newCategoriesList: ICategory[] = this.categoriesList.filter(el => el.id !== this.currentObj.id );
        this.deleteProducts();
        this.categoriesList = newCategoriesList;
      }
    });
    this.closeModal();
  }

  deleteProducts() {
    const currentProductName = this.currentObj.name.toLocaleLowerCase();
    this.categoriesService.deleteAll(currentProductName).subscribe((response: IProductsServerModel) => {
      if (response.success) {
        console.log('succesfully');
      }
    });
  }

  closeModal() {
    this.IsModalShow = false;
    this.infoMessage = '';
  }
}
