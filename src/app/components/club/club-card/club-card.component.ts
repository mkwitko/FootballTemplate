import { NavigationService } from './../../../services/navigation/navigation.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.scss'],
})
export class ClubCardComponent {
  @Input() item;
  constructor(private nav: NavigationService) {}

  goTo(item) {
    if (item.out) {
      this.nav.away(item.path);
    } else {
      this.nav.goTo(item.path);
    }
  }
}
