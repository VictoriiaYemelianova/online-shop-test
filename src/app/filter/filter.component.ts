import { Component, OnInit } from '@angular/core';
import { FilterService } from '../service/filter.service';
import { IFilter } from '../data-interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public optionList: Array<string>;
  public newPriceObj: IFilter = {};
  public priceFrom: string;
  public priceTo: string;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.filterService.addFilter(null);
    this.optionList = this.filterService.sortBy;
  }

  getSelectedFilter(event) {
    const obj = {
      sortby: event
    };
    this.filterService.addFilter(obj);
  }

  addPriceFilter() {
    this.newPriceObj = {
      pricefrome: parseInt(this.priceFrom, 10),
      priceto: parseInt(this.priceTo, 10)
    };

    this.filterService.addFilter(this.newPriceObj);
  }
}
