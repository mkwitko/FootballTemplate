import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelService {
  public firebase;
  public app = {
    appName: '',
    menu: [],
    firebase: {},
    color: {},
    tabs: [],
  };

  constructor() {}

  /* Getters */

  /* Setters */
  setSocioInfo(socioInfo) {
    // TODO implementar funcionalidade de sócio
  }
}
