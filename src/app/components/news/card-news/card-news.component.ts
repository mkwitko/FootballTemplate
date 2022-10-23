import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
})
export class CardNewsComponent implements OnInit {
  @Input() info;

  constructor(private navigation: NavigationService) {}

  ngOnInit() {}

  goTo(info) {
    console.log(info);
    this.navigation.rotaId('news-details', info.id);
  }
}
