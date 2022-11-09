import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/apis/football/football.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScrollerService } from 'src/app/services/scroller/scroller.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  constructor(
    public football: FootballService,
    private navigation: NavigationService,
    private scroller: ScrollerService
  ) {}

  ionViewWillEnter() {
    console.log(this.football.games);
    if (!this.football.games) {
      this.navigation.goTo('home');
    } else {
      if (this.football.notFinished(this.football.games).length > 0) {
        this.scroller.scroll(
          this.football.notFinished(this.football.games)[0].match_id
        );
      } else {
        let finished = this.football.finished(this.football.games);
        this.scroller.scroll(finished[finished.length - 1].match_id);
      }
    }
  }
}
