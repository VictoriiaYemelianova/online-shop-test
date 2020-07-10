import { Component, OnInit } from '@angular/core';
import { RoutWrapperService } from '../service/rout-wrapper.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-product-wrapper',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.scss']
})
export class ProductWrapperComponent implements OnInit {
  public breadCrumbs: Array<any>;
  private userRole: string;

  constructor(
    private routWrapperService: RoutWrapperService,
    private userServiceService: UserServiceService
    ) {
      this.userRole = this.userServiceService.logUser.user.role;
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
  }

}
