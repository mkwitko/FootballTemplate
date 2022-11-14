import { Component, OnInit } from '@angular/core';
import { StoreClass } from 'src/app/classes/store/store';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.page.html',
  styleUrls: ['./conv.page.scss'],
})
export class ConvPage implements OnInit {
  public default = {};

  constructor(public storeClass: StoreClass) {}

  ngOnInit() {}
}
