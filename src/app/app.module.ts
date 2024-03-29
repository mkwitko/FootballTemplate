import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Http
import { HttpClientModule } from '@angular/common/http';

//Environment
import { environment } from 'src/environments/environment';

//Firebase
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {
  AngularFireRemoteConfigModule,
  SETTINGS,
} from '@angular/fire/compat/remote-config';

//AwesomePlugins
import { AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';

//Social Sharing
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

//InAppBrwoser
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

//ScreenOrientation
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

//Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './modules/shared/shared/shared.module';

import { Capacitor } from '@capacitor/core';

//Cache
import { IonicStorageModule } from '@ionic/storage-angular';

import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideStorage, getStorage } from '@angular/fire/storage';

//One Signal
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ swipeBackEnabled: false }),
    AppRoutingModule,

    //Modules
    SharedModule,

    //Http
    HttpClientModule,

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.global.firebase)),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence,
        });
      } else {
        return getAuth();
      }
    }),
    AngularFireModule.initializeApp(environment.global.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireRemoteConfigModule,

    //Toast
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    //Cache
    IonicStorageModule.forRoot(),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SETTINGS,
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {},
    },
    //AwesomePlugins
    AwesomeCordovaNativePlugin,

    //InAppBrwoser
    InAppBrowser,

    //ScreenOrientation
    ScreenOrientation,

    //Social Sharing
    SocialSharing,
    ScreenTrackingService,
    UserTrackingService,

    //One Signal
    OneSignal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
