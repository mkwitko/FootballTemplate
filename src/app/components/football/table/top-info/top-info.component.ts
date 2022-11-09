import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-info',
  templateUrl: './top-info.component.html',
  styleUrls: ['./top-info.component.scss'],
})
export class TopInfoComponent implements OnInit {
  @Input() obj;
  constructor() {}

  ngOnInit() {}
}
