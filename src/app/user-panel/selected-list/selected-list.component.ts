import { Component, OnInit, Input } from '@angular/core';
import { SelectedlistService } from 'src/app/service/selectedlist.service';
import { IProduct } from 'src/app/data-interface';

@Component({
  selector: 'app-selected-list',
  templateUrl: './selected-list.component.html',
  styleUrls: ['./selected-list.component.scss']
})
export class SelectedListComponent implements OnInit {
  public selectedproductsNumber: number;
  public selectedProducts: Array<IProduct>;

  constructor(private selectedlistService: SelectedlistService) { }

  ngOnInit(): void {
    this.selectedlistService.selectedProduct.subscribe((res: Array<IProduct>) => {
      this.selectedProducts = res;
      this.selectedproductsNumber = this.selectedProducts.length;
    });
  }

}
