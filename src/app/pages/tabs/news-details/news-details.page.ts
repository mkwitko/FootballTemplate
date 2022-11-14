import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/classes/news/news';
import { WordpressService } from 'src/app/services/apis/wordpress/wordpress.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage {
  public id;
  public build = {
    id: '',
    image: '',
    title: '',
    date: '',
    text: '',
    link: '',
  };

  private data;
  private index;
  private maxLength;
  constructor(
    public wl: WhiteLabelService,
    private route: ActivatedRoute,
    private newsClass: News,
    private navigation: NavigationService,
    private screen: ScreenService,
    private wp: WordpressService
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params && this.newsClass.get().length > 0) {
        this.id = params.id;
        this.setPage(this.id);
      } else {
        this.navigation.goTo('tab2');
      }
    });
  }

  builder() {
    if (this.wl.app.isWordpress) {
      this.build = {
        id: this.data.id,
        image: this.data.yoast_head_json.og_image[0].url,
        title: this.data.content.rendered,
        date: this.data.date,
        text: this.data.content.rendered,
        link: this.data.guid.rendered,
      };
    } else {
      this.build = {
        id: this.data.id,
        image: this.data.downUrl,
        title: this.data.titulo,
        date: this.data.createdAt,
        text: this.data.texto,
        link: this.data.link,
      };
    }
  }

  setPage(id) {
    this.data = this.newsClass.find(id);
    this.index = this.data.index;
    this.maxLength = this.newsClass.get().length;
    this.builder();
  }

  change(value) {
    this.index = this.safeIndex(value);
    this.pickNewsByIndex(this.index).then((res) => {
      this.setPage(res.id);
    });
  }

  pickNewsByIndex(index): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.wl.app.isWordpress) {
        if (Number(index) >= this.wp.get().length) {
          this.screen.presentLoading();
          this.wp
            .getPosts(this.wp.getPagesCount() + 1)
            .then(() => {
              resolve(this.wp.get()[index]);
              this.screen.dismissloading();
            })
            .catch((err) => {
              this.screen.presentToast('Não foi possível realizar esta ação.');
              console.warn(err);
            });
        } else {
          resolve(this.wp.get()[index]);
        }
      } else {
      }
    });
  }

  safeIndex(value) {
    this.index += value;
    if (this.index >= this.maxLength) {
      return this.index++;
    } else if (this.index < 0) {
      return this.maxLength - 1;
    } else {
      return this.index;
    }
  }

  verMais(url) {
    this.navigation.away(url);
  }
}
