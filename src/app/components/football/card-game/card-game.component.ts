import { IonSlides } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit {
  @Input() matches = null;
  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide: this.matches ? this.matches.length / 2 + 1 : 0,
  };

  constructor() {}

  ngOnInit() {}
}
