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
  public listPlantFilter: any[];

  //Critères de tri
  counterPrix: number;
  counterAlpha: number;
  counterAvis: number;
  upDownPrix: boolean;
  upDownAlpha: boolean;
  upDownAvis: boolean;
  private currentTri: CurrentTri;

  //Critères de filtre
  private minValue: number;
  private maxValue: number;
  private rating: number;
  private filtreCat: string[];
  public search = '';

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listCategoriesFilter = [];
    this.listPlantFilter = [];
    this.filtreCat = [];
    this.counterPrix = 0;
    this.counterAlpha = 0;
    this.counterAvis = 0;
    this.upDownPrix = true;
    this.upDownAlpha = true;
    this.upDownAvis = true;
    this.minValue = 0;
    this.maxValue = 1000;
    this.rating = 0;
    this.currentTri = CurrentTri.TRI_ALPHA; //Par défault, les plantes seront triées par ordre alphabétique
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
      this.filtreCat = this.listCategoriesFilter;
      this.listData = [...listPlant];
      // this.listData.length = 9;
      this.listPlantFilter = [...listPlant]; //listPlantFilter tableau brut qui ne change pas
    });
  }

  onEventLike(isLiked: boolean) {
    this.plantouneService.plantLiked$.next(isLiked);
  }

  onPriceFiltered(minmaxValues: MinMax) {
    this.minValue = minmaxValues.min;
    this.maxValue = minmaxValues.max;
    this.filter();
  }

  rechercheCat(filterCategories: string[]) {
    if (filterCategories.length == 0) {
      this.filtreCat = this.listCategoriesFilter;
    } else {
      this.filtreCat = filterCategories;
    }
    this.filter();
  }

  onStarFiltered(rating: any) {
    this.rating = rating;
    this.filter();
  }

  searchInput(searchEvent: any) {
    console.log(searchEvent.target.value);
    this.search = searchEvent.target.value;
    this.filter();
  }

  /**
   * Filtre les plantes affichées dans la page d'après des critères définis par l'utilisateur
   */
  private filter() {
    console.log(`
    Values filtered :
    prix min : ${this.minValue}
    prix max : ${this.maxValue}
    catégories : ${this.filtreCat}
    rating : ${this.rating}
    search : ${this.search}
    tri actuel : ${this.currentTri}`);

    //On applique les filtres.
    this.listData = this.listPlantFilter.filter((product) => {
      return (
        parseInt(product.product_unitprice_ati) <= this.maxValue &&
        parseInt(product.product_unitprice_ati) >= this.minValue &&
        this.filtreCat.includes(product.product_breadcrumb_label) &&
        product.product_rating >= this.rating &&
        product.product_name.toLowerCase().includes(this.search.toLowerCase())
      );
    });

    //On applique les critères de tri.
    switch (this.currentTri) {
      case CurrentTri.TRI_ALPHA:
        this.triAlpha();
        break;
      case CurrentTri.TRI_AVIS:
        this.triAvis();
        break;
      case CurrentTri.TRI_PRIX:
        this.triPrix();
        break;
      default:
    }
  }

  triPrixPlant(event: any) {
    // const text = event.target.innerText;
    // console.log(text);
    // if (text == 'Prix') {
    this.counterPrix++;
    this.upDownPrix = !this.upDownPrix;
    this.currentTri = CurrentTri.TRI_PRIX;
    this.triPrix();
  }

  private triPrix() {
    console.log('Counter prix : ' + this.counterPrix);
    if (this.counterPrix % 2 == 0) {
      // this.upDownPrix = false;
      this.listData = this.listData.sort((a, b) => {
        console.log(parseFloat(a.product_price));
        if (parseFloat(b.product_price) < parseFloat(a.product_price)) {
          return -1;
        } else if (parseFloat(b.product_price) > parseFloat(a.product_price)) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.listData = this.listData.sort((a, b) => {
        // this.upDownPrix = true;
        //console.log(a.product_price);
        if (parseFloat(a.product_price) < parseFloat(b.product_price)) {
          return -1;
        } else if (parseFloat(a.product_price) > parseFloat(b.product_price)) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  triAlphaPlant(event: any) {
    // const text = event.target.innerText;
    // console.log(text);
    // if (text == 'Ordre Alpha') {
    this.counterAlpha++;
    this.upDownAlpha = !this.upDownAlpha;
    this.currentTri = CurrentTri.TRI_ALPHA;
    this.triAlpha();
    // }
  }

  private triAlpha() {
    console.log(this.counterAlpha);
    if (this.counterAlpha % 2 == 0) {
      this.listData = this.listData.sort((a, b) => {
        //console.log(a.product_price);
        if (b.product_name < a.product_name) {
          return -1;
        } else if (b.product_name > a.product_name) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      console.log('mo');
      // this.upDownAlpha = true;
      this.listData = this.listData.sort((a, b) => {
        //console.log(a.product_price);
        if (a.product_name < b.product_name) {
          return -1;
        } else if (a.product_name > b.product_name) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  triAvisPlant(event: any) {
    this.counterAvis++;
    this.currentTri = CurrentTri.TRI_AVIS;
    this.upDownAvis = !this.upDownAvis;
    this.triAvis();
  }

  private triAvis() {
    console.log(this.counterAvis);
    if (this.counterAvis % 2 == 0) {
      this.listData = this.listData.sort((a, b) => {
        //console.log(a.product_price);
        if (b.product_rating < a.product_rating) {
          return -1;
        } else if (b.product_rating > a.product_rating) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      console.log('mo');
      this.listData = this.listData.sort((a, b) => {
        //console.log(a.product_price);
        if (a.product_rating < b.product_rating) {
          return -1;
        } else if (a.product_rating > b.product_rating) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
}

enum CurrentTri {
  TRI_PRIX,
  TRI_ALPHA,
  TRI_AVIS,
}
