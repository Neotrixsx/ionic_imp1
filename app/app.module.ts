import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { IonicStorageModule } from '@ionic/storage';
import { Market } from '@ionic-native/market';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { AdMobPro } from '@ionic-native/admob-pro';
import { Push } from '@ionic-native/push';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

import { MyApp } from './app.component';
import { JsonProvider } from '../providers/json/json';
import { CommonProvider } from '../providers/common/common';
import { RestfulServicesProvider } from '../providers/restful-services/restful-services';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    SocialSharing,
    EmailComposer,
    Device,
    AppVersion,
    AdMobPro,
    Push,
    Market,
    ThemeableBrowser,
    SpinnerDialog,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    JsonProvider,
    RestfulServicesProvider
  ]
})
export class AppModule {}
