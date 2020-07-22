import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ISubcategory, ICategory } from '../data-interface';
import { ActivatedRoute } from '@angular/router';
import { RoutWrapperService } from '../service/rout-wrapper.service';
import { CategoryService } from '../service/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;

  public isAdmin = false;
  public IsModalShow = false;
  public subcategories: Array<ISubcategory>;
  public categoryName: string;
  public currentObj: ICategory;
  public currentCategoryId: number;
  public onUpdateForm: FormGroup;

  public currentTemplate: TemplateRef<any>;

  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private routWrapperService: RoutWrapperService,
  ) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      if (data.isAdmin) {
        this.isAdmin = true;
      }
    });

    this.categoryService.currentCategory.subscribe(res => {
      if (res) {
        this.currentCategoryId = res.id;
        this.subcategories = res.Categories;
      }
    });

    this.onUpdateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required)
    });
  }

  setSubcategory(subcategory) {
    this.categoryService.setCurrentCategory(subcategory);
  }

  onUpdateCategory(obj: ICategory, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentTemplate = this.updateTemplate;
    this.IsModalShow = true;
    this.currentObj = obj;
    this.onUpdateForm.controls.name.setValue(obj.name);
    this.onUpdateForm.controls.imgUrl.setValue(obj.imgUrl);
  }

  sendUpdatedSubategory() {
    const formValue = this.onUpdateForm.value;
    formValue.name = formValue.name.toLocaleLowerCase();
    formValue.id = this.currentObj.id;
    formValue.subcategoryId = this.currentCategoryId;
    this.categoryService.update(formValue).subscribe();
    this.closeModal();
  }

  closeModal() {
    this.IsModalShow = false;
  }
}
