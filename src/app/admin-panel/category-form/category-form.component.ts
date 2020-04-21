import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { IServerModel } from 'src/app/data-interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup;
  public infoMessage: string;

  constructor( private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required)
    });
  }

  onSubmitNewCategpry() {
    const formValue = this.categoryForm.value;
    formValue.name = formValue.name.toLowerCase();
    this.categoryService.create(formValue)
      .subscribe((res: IServerModel) => {
        if (res.success) {
          this.infoMessage = 'Created successfully!';
          this.categoryForm.reset();
        } else {
          this.infoMessage = 'Error!';
        }
      });
  }
}
