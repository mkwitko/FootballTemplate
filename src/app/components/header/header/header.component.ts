import { environment } from 'src/environments/environment';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { Component, Input, OnInit } from '@angular/core';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title = '';
  @Input() url;
  @Input() menu = true;
  @Input() modal = false;
  @Input() login = false;

  constructor(
    private screen: ScreenService,
    private whitelabel: WhiteLabelService
  ) {}

  ngOnInit() {
    this.title = this.whitelabel.app.appName;
  }

  close() {
    this.screen.modalController.dismiss();
  }

  notification() {
    this.screen.presentToast(
      'Você não tem nenhuma notificação.',
      '',
      'warning'
    );
  }
}
