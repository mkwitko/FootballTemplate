import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/apis/football/football.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.page.html',
  styleUrls: ['./tabela.page.scss'],
})
export class TabelaPage implements OnInit {
  // public infoObj = this.football.find(this.football.getActiveTable());
  segment = 'liga';
  segments = ['liga', 'regional'];

  constructor(
    public football: FootballService,
    private nav: NavigationService
  ) {}

  ngOnInit(): void {
    // if (!this.football.getActiveTable()) this.nav.goTo('home');
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
    if (this.segment === this.segments[0]) {
      this.football.setActiveTable(this.football.league);
    } else {
      this.football.setActiveTable(this.football.regional);
    }
  }
}
