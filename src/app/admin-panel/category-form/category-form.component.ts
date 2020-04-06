import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ICategoriesServerModel } from 'src/app/data-interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup;
  public infoMessage: string;

  constructor( private categoriesService: DataService ) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required)
    });
  }

  onSubmitNewCategpry() {
    const formValue = this.categoryForm.value;
    this.categoriesService.create(formValue, 'categories')
      .subscribe((res: ICategoriesServerModel) => {
        if (res.success) {
          this.infoMessage = 'Created successfully!';
          this.categoryForm.reset();
        } else {
          this.infoMessage = 'Error!';
        }
      });
  }
}
