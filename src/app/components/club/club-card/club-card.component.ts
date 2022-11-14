import { redirectCard } from './../../../interfaces/redirectCard/redirect-card';
import { NavigationService } from './../../../services/navigation/navigation.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.scss'],
})
export class ClubCardComponent {
  @Input() item: redirectCard;
  constructor(private nav: NavigationService) {}

  goTo(item: redirectCard) {
    if (item.link) {
      this.nav.away(item.link);
    } else {
      this.nav.goTo(item.router);
    }
  }
}
