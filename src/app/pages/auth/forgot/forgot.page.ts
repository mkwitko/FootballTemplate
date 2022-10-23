import { environment } from 'src/environments/environment';
import { NavigationService } from './../../../services/navigation/navigation.service';
import { ScreenService } from './../../../services/screen/screen.service';
import { AuthService } from './../../../services/firebase/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  public buttonState = true;
  public confirmar = false;
  public email;
  public logo = environment.global.app.logo;

  constructor(
    private auth: AuthService,
    private screen: ScreenService,
    private navigation: NavigationService
  ) {}

  ngOnInit() {}

  change2(event) {
    this.confirmar = event.detail.checked;
    this.habilitar();
  }

  habilitar() {
    if (this.confirmar) {
      this.buttonState = false;
    } else {
      this.buttonState = true;
    }
  }

  goTo(url) {
    this.navigation.goTo(url);
  }

  enviar(email) {
    if (email != null) {
      try {
        // this.auth.resetPassword(email);
      } catch (error) {
        this.screen.presentToast(error);
      } finally {
        this.goTo('home');
      }
    }
  }
}
