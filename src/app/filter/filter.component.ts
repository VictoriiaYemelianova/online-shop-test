import { Component, OnInit } from '@angular/core';
import { FilterService } from '../service/filter.service';
import { RoutWrapperService } from '../service/rout-wrapper.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public optionList: Array<string>;

  constructor(
    private filterService: FilterService,
    private routWrapperService: RoutWrapperService
  ) { }

  ngOnInit(): void {
    this.optionList = this.filterService.sortBy;
  }

  getSelectedSortByValue(event) {
    this.routWrapperService.addQueryParams(event);
  }
}
