import { NavigationService } from './../../../services/navigation/navigation.service';
import { IonSlides } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiFootball } from 'src/app/interfaces/api-football';
import { FootballService } from 'src/app/services/apis/football/football.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit {
  @Input() matches = null;
  @Input() slider = true;
  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide: this.matches ? this.matches.length / 2 + 1 : 5,
  };

  nonSlide = {};

  constructor(
    private api: FootballService,
    private screen: ScreenService,
    private nav: NavigationService
  ) {}

  ngOnInit() {}

  stat(match) {
    // const st =
    //   match.match_hometeam_id +
    //   '/' +
    //   match.match_awayteam_id +
    //   '/' +
    //   match.match_id;
    // this.nav.rotaId('match-details', st);
  }
}
