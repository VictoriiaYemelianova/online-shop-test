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
  public categoryName: string;

  constructor(private router: ActivatedRoute, private categoriesService: DataService) { }
  public toUpdateForm: FormGroup;
  public infoMessage: string;

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
        console.log(this.isAdmin);
      });
    });

    this.toUpdateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      _id: new FormControl({value: '', disabled: true})
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  updateCategory(obj: ICategory) {
    this.IsModalShow = true;
    this.categoryName = obj.name;
    this.toUpdateForm.controls.name.setValue(obj.name);
    this.toUpdateForm.controls.imgUrl.setValue(obj.imgUrl);
    this.toUpdateForm.controls._id.setValue(obj._id);
  }

  toUpdate() {}

  toCancel() {}

  deleteCategory() {}

}
