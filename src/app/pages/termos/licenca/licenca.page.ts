import { Component, OnInit } from '@angular/core';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-licenca',
  templateUrl: './licenca.page.html',
  styleUrls: ['./licenca.page.scss'],
})
export class LicencaPage implements OnInit {
  constructor(public wl: WhiteLabelService) {}

  ngOnInit() {}
}
