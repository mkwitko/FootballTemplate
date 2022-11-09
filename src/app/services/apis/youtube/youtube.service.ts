import { promise } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WhiteLabelService } from '../../white-label/white-label.service';
import { CacheHelperService } from 'src/app/helpers/cacheHelper/cache-helper.service';
import { SafeUrlService } from '../../sanitize/safe-url.service';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  public channel;
  public exclusive;
  public youtubeUpdate;
  public ready = false;

  private cachePlaylist = environment.global.apiYoutube.cachePath.playlist;
  private cachePlaylistExclusiva =
    environment.global.apiYoutube.cachePath.playlistExclusiva;
  private cacheLive = environment.global.apiYoutube.cachePath.live;
  private cacheUpdate = environment.global.apiYoutube.cachePath.update;

  constructor(
    private http: HttpClient,
    private wl: WhiteLabelService,
    private cache: CacheHelperService,
    private safe: SafeUrlService
  ) {}

  get(who): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(who).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getUrlPlaylistExclusiva() {
    return (
      environment.global.apiYoutube.basePlaylistExclusiva +
      this.wl.app.youtube.exclusive +
      '&key=' +
      this.wl.app.youtube.key
    );
  }

  getUrlChannel() {
    return (
      environment.global.apiYoutube.baseChannel +
      this.wl.app.youtube.channel +
      environment.global.apiYoutube.maxResults +
      '&key=' +
      this.wl.app.youtube.key
    );
  }

  getUrlChannelById(id) {
    return (
      environment.global.apiYoutube.basePlaylistExclusiva +
      id +
      '&key=' +
      this.wl.app.youtube.key
    );
  }

  getUrlLive() {
    environment.global.apiYoutube.baseLive +
      environment.global.apiYoutube.baseChannel +
      this.wl.app.youtube.channel +
      '&order=date' +
      '&key=' +
      this.wl.app.youtube.key;
  }

  getUrlYoutubeActivity(time) {
    return (
      environment.global.apiYoutube.baseActivity +
      '&channelId=' +
      environment.global.apiYoutube.baseChannel +
      this.wl.app.youtube.channel +
      '&publishedAfter=' +
      this.toIso(time) +
      '&key=' +
      this.wl.app.youtube.key
    );
  }

  private toIso(time) {
    var dateParsed = new Date(Date.parse(time));
    return dateParsed.toISOString();
  }

  setUpdateTime(time, results) {
    this.youtubeUpdate = this.makeResult(time, results);
  }

  makeResult(time, results) {
    return {
      time: this.toIso(time),
      results: results,
    };
  }

  sanitize(object, modest = false) {
    if (modest) {
      for (const a of object) {
        const url =
          'https://www.youtube.com/embed/' + a.snippet.resourceId.videoId;
        a.snippet.resourceId.videoId = this.safe.sanitize(url);
      }
    } else {
      for (const a of object) {
        const url =
          'https://www.youtube.com/embed/' + a.snippet.resourceId.videoId;
        a.snippet.resourceId.videoId = this.safe.sanitize(url);
      }
    }
  }

  setActivity(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.getterCache(this.cacheUpdate).then((cache) => {
        if (!cache) {
          this.get(this.getUrlYoutubeActivity(new Date(0)))
            .then((activity) => {
              this.setUpdateTime(new Date(0), activity.pageInfo.totalResults);
              this.cache.setterCache(this.youtubeUpdate, this.cacheUpdate);
              resolve(this.youtubeUpdate);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.get(this.getUrlYoutubeActivity(new Date()))
            .then((new_act) => {
              const result = this.makeResult(
                this.toIso(new Date()),
                new_act.pageInfo.totalResults
              );
              this.setUpdateTime(result.time, result.results);
              this.cache.setterCache(this.youtubeUpdate, this.cacheUpdate);
              resolve(this.youtubeUpdate);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        }
      });
    });
  }

  setChannel(update = false): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.getterCache(this.cachePlaylist).then((cache) => {
        if (!cache || update) {
          this.get(this.getUrlChannel())
            .then((channel) => {
              this.channel = channel.items;
              this.cache.setterCache(channel.items, this.cachePlaylist);
              resolve(channel.items);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.channel = cache;
          resolve(cache);
        }
      });
    });
  }

  setExclusive(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .getterCache(this.cachePlaylistExclusiva)
        .then((cache) => {
          if (!cache) {
            this.get(this.getUrlPlaylistExclusiva())
              .then((exclusive) => {
                this.exclusive = exclusive.items;
                this.sanitize(this.exclusive, true);
                this.cache.setterCache(
                  exclusive.items,
                  this.cachePlaylistExclusiva
                );
                resolve(exclusive.items);
              })
              .catch((err) => {
                console.warn(err);
                reject(err);
              });
          } else {
            this.exclusive = cache;
            this.sanitize(this.exclusive, true);
            resolve(cache);
          }
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    });
  }

  setClass(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.setActivity()
        .then((http) => {
          this.setChannel(http.results > 0 ? true : false)
            .then(() => {
              this.setExclusive()
                .then(() => {
                  this.ready = true;
                  resolve(true);
                })
                .catch((err) => {
                  console.warn(err);
                  reject(err);
                });
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    });
  }
}
