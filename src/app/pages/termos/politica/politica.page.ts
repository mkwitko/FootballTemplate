import { Component, OnInit } from '@angular/core';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.page.html',
  styleUrls: ['./politica.page.scss'],
})
export class PoliticaPage implements OnInit {
  constructor(public wl: WhiteLabelService) {}

  ngOnInit() {}
}
