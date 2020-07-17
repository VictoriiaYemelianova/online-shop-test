import { Component, OnInit } from '@angular/core';
import { FilterService } from '../service/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public optionList: Array<string>;
  public priceFrom = '';
  public priceTo = '';
  public sortBy = '';

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.optionList = this.filterService.sortBy;
    this.sortBy = this.filterService.setFilters.sortby;
  }

  getSelectedSortBy(event) {
    this.filterService.addSorting(event);
  }

  addPriceFilter() {
    this.filterService.addPriceFilter(parseInt(this.priceFrom, 10), parseInt(this.priceTo, 10));
  }
}
