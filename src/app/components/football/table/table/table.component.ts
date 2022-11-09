import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/apis/football/football.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public infoObj = this.football.find(this.football.getActiveTable());
  segment = 'liga';
  segments = ['liga', 'regional'];

  constructor(
    public football: FootballService,
    private nav: NavigationService
  ) {}

  segmentChanged(event) {
    this.segment = event.detail.value;
    if (this.segment === this.segments[0]) {
    } else {
      this.football.setActiveTable(this.football.regional);
    }

    this.infoObj = this.football.find(this.football.getActiveTable());
  }
}
