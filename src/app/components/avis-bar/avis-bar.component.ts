import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avis-bar',
  templateUrl: './avis-bar.component.html',
  styleUrls: ['./avis-bar.component.scss'],
})
export class AvisBarComponent implements OnInit {
  starStates: { stateSelectedUser: boolean; stateHoverUser: boolean }[];
  @Output() starClicked = new EventEmitter<any[]>();
  @Input() initialRating: string = '0';

  constructor() {
    this.starStates = [];
  }

  ngOnInit(): void {
    const numInitRating = parseInt(this.initialRating);
    console.log('Initial rating : ' + numInitRating);
    for (let index = 0; index < 5; index++) {
      if (index < numInitRating) {
        this.starStates.push({
          stateSelectedUser: true,
          stateHoverUser: false,
        });
      } else {
        this.starStates.push({
          stateSelectedUser: false,
          stateHoverUser: false,
        });
      }
    }
  }

  onMouseOver(index: number) {
    console.log('star over', index);
    for (let i = 0; i < this.starStates.length; i++) {
      if (i <= index) {
        this.starStates[i].stateHoverUser = true;
      } else {
        this.starStates[i].stateHoverUser = false;
      }
    }
  }

  onMouseLeave() {
    // this.starState = ['star', 'star', 'star', 'star', 'star'];
    const tempTab = [];
    for (let index = 0; index < this.starStates.length; index++) {
      tempTab.push({
        stateSelectedUser: this.starStates[index].stateSelectedUser,
        stateHoverUser: this.starStates[index].stateSelectedUser,
      });
    }
    this.starStates = [...tempTab];
  }

  onClickStar(starIndex: number) {
    for (let i = 0; i < this.starStates.length; i++) {
      if (i <= starIndex) {
        this.starStates[i].stateSelectedUser = true;
      } else {
        this.starStates[i].stateSelectedUser = false;
      }
    }
    this.starClicked.emit(this.starStates);
  }
}
