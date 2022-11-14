import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  @Input() info;

  public build = {
    id: '',
    image: '',
    title: '',
    date: '',
    text: '',
    link: '',
  };
  constructor(
    public whiteLabel: WhiteLabelService,
    private navigation: NavigationService
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
        link: this.info,
      };
    } else {
      this.build = {
        id: this.info.id,
        image: this.info.downUrl,
        title: this.info.titulo,
        date: this.info.createdAt,
        text: this.info.texto,
        link: this.info.link,
      };
    }
  }

  verMais(url) {
    this.navigation.away(url);
  }
}
