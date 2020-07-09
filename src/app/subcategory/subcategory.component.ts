import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ISubcategory } from '../data-interface';
import { ActivatedRoute } from '@angular/router';
import { RoutWrapperService } from '../service/rout-wrapper.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  public isAdmin = false;
  public subcategories: Array<ISubcategory>;
  public categoryName: string;

  public faTrashAlt = faTrashAlt;
  public faPencilAlt = faPencilAlt;

  constructor(
    private routWrapperService: RoutWrapperService,
    private router: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      if (data.isAdmin) {
        this.isAdmin = true;
      }
    });

    this.categoryService.currentCategory.subscribe(res => {
      if (res) {
        this.subcategories = res.Categories;
      }
    });
  }

  setSubcategory(subcategory) {
    this.categoryService.setCurrentCategory(subcategory);
  }
}
