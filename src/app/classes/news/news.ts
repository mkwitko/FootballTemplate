import { ScreenService } from './../../services/screen/screen.service';
import { NoticiaLengthClass } from './noticialength';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MasterHelperService } from 'src/app/helpers/masterHelper/master-helper.service';
import { Noticia } from 'src/app/interfaces/noticia/noticia';
import { WordpressService } from 'src/app/services/apis/wordpress/wordpress.service';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud/crud.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { CacheService } from 'src/app/services/cache/cache.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Injectable()
export class News {
  public collection: AngularFirestoreCollection;
  public path = environment.global.paths.news;

  private findNews = [];
  private value = new Array<any>();

  constructor(
    private helper: MasterHelperService,
    private wordpress: WordpressService,
    private noticiaLength: NoticiaLengthClass,
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private wl: WhiteLabelService
  ) {
    this.collection = this.helper.crudHelper.crud.collectionConstructor(
      this.path
    );
  }
  getCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(this.path)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    if (this.wl.app.isWordpress) {
      return this.value;
    } else {
      let result = [];
      for (const a of this.value) {
        for (const b of a.data) {
          result.push(b);
        }
      }
      return result;
    }
  }

  setCache(value: any, page = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .setArray(this.path, value, page)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  set(value) {
    this.value = value;
    this.fillFinder(value);
  }

  fillFinder(value) {
    let count = 0;
    for (const a of value) {
      a.index = count;
      this.findNews[a.id] = a;
      count++;
    }
  }

  find(id) {
    return this.findNews[id];
  }

  getLimitHttp(limit = 10, page = 1, shouldUpdate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.noticiaLength.setClass(shouldUpdate).then((res) => {
        this.crud.getLimit(this.path, res[0].size, limit, page).subscribe({
          next: (res) => {
            const result = res;
            resolve(result);
          },
          error: (err) => {
            this.screen.presentToast(this.translate.verifyErrors(err.code));
            reject(err);
          },
        });
      });
    });
  }

  finder(object) {
    let finder = [];
    for (const a of object) {
      finder[a.page] = a.data;
    }
    return finder;
  }

  setClass(shouldUpdate: boolean, page = 1, limit = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache || shouldUpdate) {
          this.getLimitHttp(limit, page, shouldUpdate)
            .then((http) => {
              this.setCache(http, page).then(() => {
                this.getCache().then((cache) => {
                  this.set(cache);
                });
              });
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          if (this.finder(cache)[page] === undefined) {
            this.getLimitHttp(limit, page, shouldUpdate)
              .then((http) => {
                if (http.length > 0) {
                  this.setCache(http, page).then(() => {
                    this.getCache().then((cache) => {
                      this.set(cache);
                      resolve(http);
                    });
                  });
                } else {
                  resolve(false);
                }
              })
              .catch(() => {
                console.warn('Failed to update');
                resolve(cache);
              });
          } else {
            this.set(cache);
            resolve(cache);
          }
        }
      });
    });
  }
}
