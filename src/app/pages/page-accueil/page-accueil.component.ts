import { Component, OnInit } from '@angular/core';
import { MinMax } from 'src/app/components/filter-side-bar/filter-side-bar.component';
import { PlantouneService } from 'src/app/services/plantoune.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss'],
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listCategoriesFilter: string[];
  public listPlantFilter : any[];

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listCategoriesFilter = [];
    this.listPlantFilter = [];
    
  
    
   }

  ngOnInit(): void {
    this.plantouneService.getData().subscribe((listPlant: any[]) => {
      console.log(listPlant);

    this.plantouneService.getData().subscribe(
      (listPlant: any[]) => {
        // console.log(listPlant);

        /**
         * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
         */
        const listAllCategories = listPlant.map(product => product.product_breadcrumb_label);
        // console.log(listAllCategories);
        
        const listUniqCategories = _.uniq(listAllCategories) 
        // console.log(listUniqCategories);
        
      /**
       * Technique native JS pour recupérer les catégories uniques de nos plantes
       */

        const listUniqJsCategories = [...new Set(listAllCategories)];
        //  console.log(listUniqJsCategories);

        this.listCategoriesFilter = listUniqJsCategories;
        this.listData = [...listPlant];
        this.listData.length = 9;
        // console.log(this.listCategoriesFilter);
        this.listPlantFilter = [...listPlant];//listPlantFilter tableau brut qui ne change pas
        
      
        
        
      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('');
  }

  onPriceFiltered(minmaxValues: MinMax) {
    const minVal = minmaxValues.min;
    const maxVal = minmaxValues.max;
    console.log(`Filtrage des prix : ${minVal}, ${maxVal}`);
    this.filterByPrice(minVal, maxVal);
  }

  private filterByPrice(minValue: number, maxValue: number) {
    this.listData = this.listPlantFilter.filter((product) => {
      return (
        parseInt(product.product_unitprice_ati) <= maxValue &&
        parseInt(product.product_unitprice_ati) >= minValue
      );
    });
    this.listData.length = 20;
    console.log('Plantes filtrées par prix : ');
    console.log(this.listData);
  }

  rechercheCat(filterCategories:string[]){
    // console.log(listCategories);
    this.listData= this.listPlantFilter.filter(product => {
      return filterCategories.includes(product.product_breadcrumb_label);
    })
  }
}
  onStarFiltered(starArray: any) {
    console.log(starArray);
    this.listData = this.listPlantFilter.filter((product) => {});
  }
}
