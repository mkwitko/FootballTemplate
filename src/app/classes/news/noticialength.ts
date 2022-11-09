import { CacheService } from '../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from '../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { Noticia } from 'src/app/interfaces/noticia/noticia';

@Injectable()
export class NoticiaLengthClass {
  private value = new Array<any>();
  private cachePath = environment.global.paths.noticialength;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.paths.noticialength;
  private interfaceRef: Noticia;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  getAllHttp(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud.getAll(this.collection).subscribe({
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
  }

  getHttp(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud.get(this.collection, this.interfaceRef, id).subscribe({
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
  }

  getCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(this.cachePath)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    return this.value;
  }

  setCache(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(this.cachePath, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  clearCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .remove(this.cachePath)
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
  }

  reset() {
    this.value = [];
  }

  setClass(shouldUpdate: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache) {
          this.getAllHttp()
            .then((http) => {
              this.setCache(http).then(() => {
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
          if (shouldUpdate) {
            this.getAllHttp()
              .then((http) => {
                this.clearCache().then(() => {
                  this.setCache(http).then(() => {
                    this.getCache().then((cache) => {
                      this.set(cache);
                    });
                  });
                });
                resolve(http);
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
