import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faShoppingCart, faSignOutAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserServiceService } from 'src/app/service/user-service.service';
import { IProduct } from 'src/app/data-interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectedlistService } from 'src/app/service/selectedlist.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  private destroy: Subject<void> = new Subject<void>();

  public isAdmin = false;

  public faShoppingBasket = faShoppingCart;
  public logoutIcon = faSignOutAlt;
  public faHeart = faHeart;

  public userProductSize: number;
  public userSelectedProductSize: number;

  constructor(
    private router: ActivatedRoute,
    private userService: UserServiceService,
    private selectedlistService: SelectedlistService) { }

  ngOnInit(): void {
    this.router.data
    .pipe(takeUntil(this.destroy))
    .subscribe(data => {
      if (data.isAdmin) {
        this.isAdmin = true;
      }
    });

    this.userService.productToBuyList.subscribe((res: Array<IProduct>) => {
      this.userProductSize = res.length;
    });

    this.selectedlistService.getSelectedProducts(this.userService.logUser.user.id).subscribe();
    this.selectedlistService.selectedProduct.subscribe((res: Array<IProduct>) => {
      this.userSelectedProductSize = res.length;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onLogOut() {
    this.userService.logOut();
  }

}
