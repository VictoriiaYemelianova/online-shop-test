import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  public isAdmin = false;
  public faShoppingBasket = faShoppingCart;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data
    .pipe(takeUntil(this.destroy))
    .subscribe(data => {
      if (data.isAdmin) {
        this.isAdmin = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
