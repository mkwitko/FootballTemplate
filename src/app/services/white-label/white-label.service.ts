import { Injectable } from '@angular/core';
import { ApiFootball } from 'src/app/interfaces/api-football';
import { Youtube } from 'src/app/interfaces/youtube/youtube';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelService {
  public firebase;
  public app = {
    appName: '',
    menu: [],
    color: {},
    tabs: [],
    isWordpress: false,
    site: '',
    footballApi: {} as ApiFootball,
    youtube: {} as Youtube,
    licenca: '',
    politica: '',
    kto: '',
    appId: '',
  };

  constructor() {}

  /* Getters */

  /* Setters */
  setSocioInfo(socioInfo) {
    // TODO implementar funcionalidade de sócio
  }
}
