import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss'],
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() idCategories = new EventEmitter<string[]>();
  @Output() filterPrice = new EventEmitter();
  @Output() filterStar = new EventEmitter<number>();
  starFilter: any[];
  categorieTab: string[];

  constructor() {
    this.listCategories = [];
    this.categorieTab = [];
    this.starFilter = [];
  }

  ngOnInit(): void {}

  /**
   * Récupère la liste des catégories cochées par l'utilisateur et l'envoi au parent
   * @param event
   */
  rechercheCategories(event: any) {
    const catPlant = event.target.value;
    const catChecked = event.target.checked;
    //  ¨  console.log(catChecked);

    if (catChecked === true) {
      this.categorieTab.push(catPlant);
    } else {
      this.categorieTab = this.categorieTab.filter((value) => {
        return value != catPlant;
      });
    }
    //  console.log(this.categorieTab);
    this.idCategories.emit(this.categorieTab);
  }

  /**
   * Récupère les prix minimum et maximum sélectionnés par l'utilisateut et les renvoi au parent
   * L'Objet MinMax est décrit en bas de ce fichier.
   */
  onFilterPriceClick() {
    const minValue = (<HTMLInputElement>(
      document.getElementById('filter-price-min')
    )).value;
    const maxValue = (<HTMLInputElement>(
      document.getElementById('filter-price-max')
    )).value;
    const minVal = minValue ? parseInt(minValue) : 0;
    const maxVal = maxValue ? parseInt(maxValue) : 0;
    const minmax = new MinMax(minVal, maxVal);
    if (minmax.isValid()) this.filterPrice.emit(minmax);
  }

  onAvisClick() {
    console.log('Avis click :)');
    this.filterStar.emit(this.getSelectedRating());
  }

  onAvisResetClick() {
    console.log('Reset click :)');
    this.resetSelectedRating();
    this.filterStar.emit(this.getSelectedRating());
    //Cette méthode fonctionne bien au niveau du filtre
    //En revanche le nombre d'étoiles affichées ne se remet pas à 0
  }

  onStarClick(starArray: any) {
    this.starFilter = starArray;
  }

  /**
   * Récupère le nombre d'étoiles actuellement séléctionnées par l'utilisateur
   * @returns
   */
  private getSelectedRating(): number {
    for (let index = 0; index < this.starFilter.length; index++) {
      if (!this.starFilter[index].stateSelectedUser) {
        return index;
      }
    }
    return 5;
  }

  /**
   * Remet les étoiles à 0
   */
  private resetSelectedRating() {
    for (let index = 0; index < this.starFilter.length; index++) {
      this.starFilter[index].stateSelectedUser = false;
    }
  }
}

/**
 * Simple classe contenant 2 valeurs numériques représentant un minimum et un maximum
 */
export class MinMax {
  min: number;
  max: number;

  constructor(private minVal: number = 0, private maxVal: number = 0) {
    this.min = minVal;
    this.max = maxVal;
  }

  public isValid(): boolean {
    return this.min <= this.max;
  }
}
