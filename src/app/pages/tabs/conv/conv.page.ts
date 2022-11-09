import { Component, OnInit } from '@angular/core';
import { Ads } from 'src/app/classes/ads/ads';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.page.html',
  styleUrls: ['./conv.page.scss'],
})
export class ConvPage implements OnInit {
  constructor(public adsClass: Ads, public wl: WhiteLabelService) {}

  ngOnInit() {}
}
