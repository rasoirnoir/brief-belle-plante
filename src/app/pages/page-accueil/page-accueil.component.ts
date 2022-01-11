import { Component, OnInit } from '@angular/core';
import { MinMax } from 'src/app/components/filter-side-bar/filter-side-bar.component';
import { PlantouneService } from 'src/app/services/plantoune.service';
import * as _ from 'underscore';
import { filter } from 'underscore';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss'],
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listCategoriesFilter: string[];
  public listPlantFilter: any[];
  public search = '';
  public filtreCat: string[];

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listCategoriesFilter = [];
    this.listPlantFilter = [];
    this.filtreCat = [];
  }

  ngOnInit(): void {
    this.plantouneService.getData().subscribe((listPlant: any[]) => {
      console.log(listPlant);

      /**
       * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
       */
      const listAllCategories = listPlant.map(
        (product) => product.product_breadcrumb_label
      );
      const listUniqCategories = _.uniq(listAllCategories);
      /**
       * Technique native JS pour recupérer les catégories uniques de nos plantes
       */
      const listUniqJsCategories = [...new Set(listAllCategories)];
      this.listCategoriesFilter = listUniqJsCategories;
      this.listData = [...listPlant];
      this.listData.length = 9;
      this.listPlantFilter = [...listPlant]; //listPlantFilter tableau brut qui ne change pas
    });
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
    if (this.listData.length > 20) this.listData.length = 20;
    console.log('Plantes filtrées par prix : ');
    console.log(this.listData);
  }

  rechercheCat(filterCategories: string[]) {
    this.filtreCat = filterCategories;
    console.log(this.filtreCat);

    if (this.filtreCat.length > 0) {
      this.listData = this.listPlantFilter.filter((product) => {
        return filterCategories.includes(product.product_breadcrumb_label);
      });
    } else if (this.filtreCat.length == 0) {
      console.log(this.listData);
      this.listData = [...this.listPlantFilter];
    }
  }

  onStarFiltered(rating: any) {
    this.listData = this.listPlantFilter.filter((product) => {
      return product.product_rating == rating;
    });
  }

  searchInput(searchEvent: any) {
    console.log(searchEvent.target.value);
    this.search = searchEvent.target.value;
    if (this.search) {
      this.listData = this.listPlantFilter.filter((el) => {
        return el.product_name
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    } else {
      this.listData = this.listData;
    }
  }
}
