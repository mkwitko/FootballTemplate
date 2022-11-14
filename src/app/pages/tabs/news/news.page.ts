import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { News } from 'src/app/classes/news/news';
import { WordpressService } from 'src/app/services/apis/wordpress/wordpress.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { ScrollerService } from 'src/app/services/scroller/scroller.service';
import { ShareService } from 'src/app/services/share/share.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {
  @ViewChild(IonContent) content: IonContent;

  constructor(
    public newsClass: News,
    private navigation: NavigationService,
    private share: ShareService,
    private scroller: ScrollerService,
    private screen: ScreenService,
    private wordpress: WordpressService,
    private wl: WhiteLabelService
  ) {}

  ngOnInit() {}

  goToTop() {
    this.content.scrollToTop();
  }

  async loadData(event) {
    await this.screen.presentLoading('Carregando notícias...');
    if (this.wl.app.isWordpress) {
      this.wordpress
        .getPosts(this.wordpress.get().length / 10 + 1)
        .then((news) => {
          this.wordpress.set(news);
          this.endEvent(
            event,
            this.wordpress.get()[this.wordpress.get().length - 10].id
          );
        });
    } else {
      this.newsClass.getCache().then((cache) => {
        const first = cache.length - 1;
        const second = cache[first].data.length - 1;
        const lastId = cache[first].data[second].id;
        this.newsClass.setClass(false, cache.length + 1).then(() => {
          this.endEvent(event, lastId);
        });
      });
    }
  }

  endEvent(event, lastId) {
    event.target.complete();
    setTimeout(() => {
      this.scroller.scroll(lastId);
      this.screen.dismissloading();
      this.content.scrollY = false;
      setTimeout(() => {
        this.content.scrollY = true;
        setTimeout(() => {
          if (!this.scroller.isInViewport(lastId)) {
            this.scroller.scroll(lastId);
          }
        }, 100);
      }, 100);
    }, 100);
  }

  goTo(info) {
    this.navigation.rotaId('news-details', info.id);
  }
}
