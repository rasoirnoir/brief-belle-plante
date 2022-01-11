import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
 @Input() listCategories: string[];
 @Output() idCategories = new EventEmitter<string[]>();
 categorieTab : string[];
  
  constructor() { 
    this.listCategories = [];
    this.categorieTab = [];
    
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
}
