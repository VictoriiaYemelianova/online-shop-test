import { Component, OnInit } from '@angular/core';
import { FilterService } from '../service/filter.service';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

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
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  public showDropDown = false;

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

  showHidePrice() {
    this.showDropDown = !this.showDropDown;
  }
}
