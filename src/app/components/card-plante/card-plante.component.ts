import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-plante',
  templateUrl: './card-plante.component.html',
  styleUrls: ['./card-plante.component.scss'],
})
export class CardPlanteComponent implements OnInit {
  @Input() plant: any;
  @Output() clickLike = new EventEmitter<boolean>();
  isLiked : boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onClickLike() {
    console.log('click');
    this.isLiked = !this.isLiked;
    this.clickLike.emit(this.isLiked);

  }
}
