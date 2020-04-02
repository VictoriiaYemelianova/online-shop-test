import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ICategory, ICategoriesServerModel } from '../data-interface';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoties',
  templateUrl: './categoties.component.html',
  styleUrls: ['./categoties.component.scss']
})
export class CategotiesComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  public categoriesList: ICategory[];
  public isAdmin = false;
  public IsModalShow = false;
  public onUpdateForm: FormGroup;
  public infoMessage: string;
  public currentObj: ICategory;

  constructor(private router: ActivatedRoute, private categoriesService: DataService) { }

  ngOnInit(): void {
    this.categoriesService.get('categories').subscribe((res: ICategoriesServerModel) => {
      if (res.success) {
        this.categoriesList = res.items;
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

  updateCategory(obj: ICategory) {
    this.IsModalShow = true;
    this.currentObj = obj;
    this.onUpdateForm.controls.name.setValue(obj.name);
    this.onUpdateForm.controls.imgUrl.setValue(obj.imgUrl);
  }

  onUpdate() {
    const formValue = this.onUpdateForm.value;
    formValue._id = this.currentObj._id;
    this.categoriesService.update(formValue, 'categories').subscribe((res: ICategoriesServerModel) => {
      if (res.success) {
        const newCategoriesList: ICategory[] = this.categoriesList.map((el: ICategory) => {
          if (el._id === res.item._id) {
            el = res.item;
          }
          return el;
        });
        this.categoriesList = newCategoriesList;
        this.infoMessage = 'Updated successfully!';
        this.onUpdateForm.reset();
      } else {
        this.infoMessage = 'Error!';
      }
    });
  }

  onCancel() {
    this.onUpdateForm.reset();
    this.IsModalShow = false;
  }

  deleteCategory(id: string) {
    alert('Delete?');
    this.categoriesService.delete(id, 'categories').subscribe((res: ICategoriesServerModel) => {
      if (res.success) {
        const newCategoriesList: ICategory[] = this.categoriesList.filter(el => el._id !== id);
        this.categoriesList = newCategoriesList;
      }
    });
  }

  closeModal() {
    this.IsModalShow = false;
  }
}
