import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserClass } from 'src/app/classes/users/user';
import { CrudHelperService } from 'src/app/helpers/crudHelper/crud-helper.service';
import { CarteiraSocioPage } from 'src/app/pages/modal/carteira-socio/carteira-socio.page';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { WhiteLabelService } from 'src/app/services/white-label/white-label.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.page.html',
  styleUrls: ['./profile-home.page.scss'],
})
export class ProfileHomePage implements OnInit {
  constructor(
    public userClass: UserClass,
    private auth: AuthService,
    private crud: CrudHelperService,
    private navigation: NavigationService,
    private alertController: AlertController,
    private screen: ScreenService,
    private wl: WhiteLabelService
  ) {}

  ngOnInit() {}

  goTo(url: string) {
    this.navigation.goTo(url);
  }

  away(url: string) {
    this.navigation.away(url);
  }

  logout() {
    this.auth.logout();
  }

  async deleteAccount() {
    await this.auth.delete().then(() => {
      this.crud.delete(
        this.userClass.collection,
        this.userClass.get().userId,
        this.userClass.get().avatar ? true : false,
        this.userClass.get().avatar
      );
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message:
        'Tem <strong>certeza</strong> que deseja excluir sua conta? Essa ação é irreversível!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    });

    await alert.present();
  }

  async checkSocio() {
    if (!this.userClass.get().cpf) {
      this.screen.presentToast('Preencha seu cpf');
    } else {
      // await this.screen.presentLoading();
      this.wl.setSocioInfo(this.userClass.get());
    }
  }

  carteiraSocio() {
    this.screen.presentModal(CarteiraSocioPage, 'transparent-modal');
  }
}
