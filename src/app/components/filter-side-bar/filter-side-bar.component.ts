import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss'],
})
export class FilterSideBarComponent implements OnInit {
   @Input() listCategories: string[];
   @Output() idCategories = new EventEmitter<string[]>();
   @Input() listCategories: string[];
   @Output() filterPrice = new EventEmitter();
   @Output() filterStar = new EventEmitter<any[]>();
   starFilter: any[];
   categorieTab : string[];
  
  constructor() { 
    this.listCategories = [];
    this.categorieTab = [];
    this.starFilter = [];
  }

  ngOnInit(): void {
  
  }

  rechercheCategories(event : any){
 
  
    
    const catPlant = event.target.value;
    const catChecked = event.target.checked;
//  ¨  console.log(catChecked);
 

      if(catChecked === true){
        this.categorieTab.push(catPlant);
        }else{
              this.categorieTab= this.categorieTab.filter(value => {
        return value != catPlant;
              })
        }
//  console.log(this.categorieTab);

        this.idCategories.emit(this.categorieTab);
  }

  onFilterPriceClick() {
    const minValue = (<HTMLInputElement>(
      document.getElementById('filter-price-min')
    )).value;
    const maxValue = (<HTMLInputElement>(
      document.getElementById('filter-price-max')
    )).value;
    const minVal = minValue ? parseInt(minValue) : 0;
    const maxVal = maxValue ? parseInt(maxValue) : 0;
    if (minVal <= maxVal) this.filterPrice.emit(new MinMax(minVal, maxVal));
  }

  onAvisClick() {
    console.log('Avis click :)');
    this.filterStar.emit(this.starFilter);
  }

  onStarClick(starArray: any) {
    console.log(starArray);
    this.starFilter = starArray;
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
