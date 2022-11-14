import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input, OnInit } from '@angular/core';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { type } from 'os';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
})
export class CardNewsComponent implements OnInit {
  @Input() info;

  public build = {
    id: '',
    image: '',
    title: '',
    date: '',
    text: '',
  };
  constructor(
    private navigation: NavigationService,
    public whiteLabel: WhiteLabelService
  ) {}

  ngOnInit() {
    this.builder();
  }

  builder() {
    if (this.whiteLabel.app.isWordpress) {
      this.build = {
        id: this.info.id,
        image: this.info.yoast_head_json.og_image[0].url,
        title: this.info.content.rendered,
        date: this.info.date,
        text: this.info.content.rendered,
      };
    } else {
      this.build = {
        id: this.info.id,
        image: this.info.downUrl,
        title: this.info.titulo,
        date: this.info.createdAt,
        text: this.info.texto,
      };
    }
  }

  goTo(info) {
    this.navigation.rotaId('news-details', info.id);
  }
}
