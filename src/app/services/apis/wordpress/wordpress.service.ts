import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { WhiteLabelService } from '../../white-label/white-label.service';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private news;

  constructor(
    private http: HttpClient,
    private whiteLabel: WhiteLabelService
  ) {}

  get() {
    return this.news;
  }

  set(value) {
    if (this.news) {
      this.news.push(...value);
    } else {
      this.news = value;
    }
  }

  getPagesCount() {
    return this.news.length / 10;
  }

  getPosts(page = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.whiteLabel.app.site + '/wp-json/wp/v2/posts?page=' + page)
        .subscribe({
          next: (res) => {
            this.set(res);
            resolve(res);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}
