import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { User } from 'src/app/interfaces/auth/user';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { UserClass } from 'src/app/classes/users/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  public userLogin: User = {};
  public userRegister: User = {};

  public confirmPassword;

  public logo = environment.global.app.logo;

  constructor(
    private navigation: NavigationService,
    private auth: AuthService,
    private user: UserClass
  ) {}

  ngOnInit() {}

  goTo(url: string) {
    this.navigation.goTo(url);
  }

  changeSlide(slideParam: string) {
    if (slideParam === 'next') {
      this.slides.slideNext();
    } else {
      this.slides.slidePrev();
    }
  }

  login() {
    this.auth.login(this.userLogin);
  }

  register() {
    this.auth.register(this.userRegister, this.confirmPassword);
  }

  loginGuest() {
    this.auth.loginGuest();
  }
}
