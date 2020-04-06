import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserServiceService } from 'src/app/service/user-service.service';
import { IProduct } from 'src/app/data-interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  public isAdmin = false;
  public faShoppingBasket = faShoppingCart;
  public userProductSize: number;

  constructor( private router: ActivatedRoute, private userService: UserServiceService ) { }

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
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onLogOut() {
    this.userService.logOut();
  }

}
