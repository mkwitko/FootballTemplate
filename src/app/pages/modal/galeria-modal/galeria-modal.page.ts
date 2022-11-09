import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria-modal',
  templateUrl: './galeria-modal.page.html',
  styleUrls: ['./galeria-modal.page.scss'],
})
export class GaleriaModalPage implements OnInit {
  @Input() who: any;

  constructor() {}

  ngOnInit() {}
}
