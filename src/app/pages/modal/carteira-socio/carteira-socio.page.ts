import { Component, OnInit } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';

@Component({
  selector: 'app-carteira-socio',
  templateUrl: './carteira-socio.page.html',
  styleUrls: ['./carteira-socio.page.scss'],
})
export class CarteiraSocioPage implements OnInit {
  constructor(public userClass: UserClass) {}

  ngOnInit() {}
}
