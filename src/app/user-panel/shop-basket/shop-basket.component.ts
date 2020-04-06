import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { IProduct } from 'src/app/data-interface';
import { faTrashAlt, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop-basket',
  templateUrl: './shop-basket.component.html',
  styleUrls: ['./shop-basket.component.scss']
})
export class ShopBasketComponent implements OnInit {
  public productList = [];
  public faTrashAlt = faTrashAlt;
  public faPlusSquare = faPlusSquare;
  public faMinusSquare = faMinusSquare;

  constructor( private userService: UserServiceService ) { }

  ngOnInit(): void {
    this.userService.productToBuyList.subscribe((res: Array<IProduct>) => {
      this.createProductList(res);
    });
  }

  createProductList(arr: Array<IProduct>) {
    arr.forEach((el: IProduct) => {
      const index = this.productList.indexOf(el);
      let newEl;
      if (index !== -1) {
        this.productList[index].count += 1;
      } else {
        newEl = el;
        newEl.count = 1;
        this.productList.push(newEl);
      }
    });
  }
}
