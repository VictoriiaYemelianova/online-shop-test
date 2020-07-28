import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ICategory, ISelectList } from '../data-interface';

interface IList<T> {
  name: string;
  value: T;
}

const categoryList: IList<ICategory>[] = [];

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  @Input() options: Array<ISelectList<any>>;
  @Input() defaultEl: ISelectList<any>;
  @Output() selectedOption: EventEmitter<ISelectList<any>> = new EventEmitter();

  public faCheck = faCheck;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  public selectedNameElement: string;
  public showDropDown = false;

  constructor() { }

  ngOnInit(): void {
    if (this.defaultEl) {
      this.selectedNameElement = this.defaultEl.name;
    }
  }

  onSelect(option) {
    this.selectedNameElement = option.name;
    this.selectedOption.emit(option.value);
  }

  showHideDropDown() {
    this.showDropDown = !this.showDropDown;
  }

}
