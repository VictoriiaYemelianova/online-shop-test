import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { ICategory, IServerModel } from 'src/app/data-interface';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.scss']
})
export class SubcategoryFormComponent implements OnInit {
  public subCategoryForm: FormGroup;
  public categories: Array<ICategory>;
  public infoMessage: string;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.fullCategories.subscribe(res => {
      this.categories = res.filter(el => !el.subcategoryId);
    });

    this.subCategoryForm = new FormGroup({
      subcategory: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formValue = this.subCategoryForm.value;
    const category = this.categories.find(el => el.name === formValue.subcategory);
    formValue.name = formValue.name.toLowerCase();
    formValue.subcategory = category.id;
    this.categoryService.create(formValue).subscribe((res: IServerModel) => {
      if (res.success) {
        this.infoMessage = 'Created successfully!';
        this.subCategoryForm.reset();
      } else {
        this.infoMessage = 'Error!';
      }
    });
  }

}
