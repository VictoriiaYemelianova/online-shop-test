import { Component, OnInit } from '@angular/core';
import { RoutWrapperService } from '../service/rout-wrapper.service';
import { UserServiceService } from '../service/user-service.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-product-wrapper',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.scss']
})
export class ProductWrapperComponent implements OnInit {
  private userRole: string;
  public breadCrumbs: Array<any>;
  public showSubcategory: boolean;

  constructor(
    private routWrapperService: RoutWrapperService,
    private userServiceService: UserServiceService,
    private categoryService: CategoryService
    ) {
      this.userRole = this.userServiceService.logUser.user.role;
      this.showSubcategory = true;
    }

  ngOnInit(): void {
    this.routWrapperService.breadcrumbs.subscribe(res => {
      if (res) {
        let path = `/${this.userRole}`;
        this.breadCrumbs = res.map(el => {
          path = `${path}/${el}`;
          return {
            name: el,
            link: `${path}`
          };
        });
      }
    });

    this.categoryService.showSubcategoryComponent.subscribe(res => {
      if (res !== null) {
        this.showSubcategory = res;
      }
    });
  }
}
