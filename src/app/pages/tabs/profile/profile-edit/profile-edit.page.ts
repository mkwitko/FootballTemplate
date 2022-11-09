import { Component, OnInit } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { CrudHelperService } from 'src/app/helpers/crudHelper/crud-helper.service';
import { CrudService } from 'src/app/services/crud/crud.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  private picture;

  constructor(
    public userClass: UserClass,
    private navigation: NavigationService,
    private screen: ScreenService,
    private crud: CrudService,
    private crudH: CrudHelperService
  ) {}

  ngOnInit() {
    this.picture = null;
  }

  choose(event) {
    this.picture = event.target.files;
    this.upload();
  }

  async upload() {
    await this.screen.presentLoading();
    if (this.picture) {
      this.crud
        .upload(
          this.userClass.get().userId,
          this.picture,
          environment.global.paths.pics
        )
        .then((res) => {
          this.userClass.setPicture(res);
          this.userClass.set(this.userClass.getEdit());
          this.crudH
            .update(
              this.userClass.collection,
              this.userClass.get(),
              this.userClass.get().userId
            )
            .then(() => {
              this.screen.presentToast(
                'Informações salvas com sucesso!',
                '',
                'sucess'
              );
            })
            .catch(() => {
              this.screen.presentToast(environment.global.erroGenerico);
            })
            .finally(() => {
              this.screen.dismissloading();
            });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.screen.dismissloading();
        });
    }
  }

  async salvar() {
    await this.screen.presentLoading();
    this.userClass.set(this.userClass.getEdit());
    this.crudH
      .update(
        this.userClass.collection,
        this.userClass.get(),
        this.userClass.get().userId
      )
      .then(() => {
        this.screen.presentToast(
          'Informações salvas com sucesso!',
          '',
          'sucess'
        );
        this.voltar();
      })
      .catch(() => {
        this.screen.presentToast(environment.global.erroGenerico);
      })
      .finally(() => {
        this.screen.dismissloading();
      });
  }

  voltar() {
    this.navigation.goTo('tab4');
  }
}
