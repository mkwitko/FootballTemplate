import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { Ads } from 'src/app/classes/ads/ads';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';
import { StoreClass } from 'src/app/classes/store/store';

@Component({
  selector: 'app-clube',
  templateUrl: './clube.page.html',
  styleUrls: ['./clube.page.scss'],
})
export class ClubePage {
  constructor(public storeClass: StoreClass) {}
}
