import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss'],
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() filterPrice = new EventEmitter();

  constructor() {
    this.listCategories = [];
  }

  ngOnInit(): void {}

  onFilterPriceClick() {
    const minValue = (<HTMLInputElement>(
      document.getElementById('filter-price-min')
    )).value;
    const maxValue = (<HTMLInputElement>(
      document.getElementById('filter-price-max')
    )).value;
    const minVal = minValue ? parseInt(minValue) : 0;
    const maxVal = maxValue ? parseInt(maxValue) : 0;
    this.filterPrice.emit(new MinMax(minVal, maxVal));
  }
}

export class MinMax {
  min: number;
  max: number;

  constructor(private minVal: number = 0, private maxVal: number = 0) {
    this.min = minVal;
    this.max = maxVal;
  }
}
