import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballService } from 'src/app/services/apis/football/football.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
  styleUrls: ['./match-details.page.scss'],
})
export class MatchDetailsPage {
  public info;
  public stats;
  public game;
  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private screen: ScreenService,
    private api: FootballService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.info = params.id.split('/');
        this.stats = this.api.findStats(this.info[0], this.info[1]);
        this.game = this.api.findGame(this.info[2]);
        if (!this.stats || !this.game) {
          this.navigation.goTo('home');
        } else {
          console.log(this.stats, this.game);
        }
      } else {
        this.navigation.goTo('home');
      }
    });
  }
}
