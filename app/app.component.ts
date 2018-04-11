import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EmailComposer } from '@ionic-native/email-composer';
import { AdMobPro } from '@ionic-native/admob-pro';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Network } from '@ionic-native/network';
import { Market } from '@ionic-native/market';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { Storage } from '@ionic/storage';

import { CommonProvider } from './../providers/common/common';
import { RestfulServicesProvider } from './../providers/restful-services/restful-services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = "HomePage";


  userimg;
  networkstatus;
  ConnectionType;
  admobid;
  fname;
  state;
  versionNumber;
  checkNotid;
  notidinfo;
  notificationinfo;
  deviceidinfo;
  fnameinfo;
  lnameinfo;
  emailinfo;
  stateinfo;
  genderinfo;
  userPostData;
  resposeData;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public common: CommonProvider, public network: Network, private emailComposer: EmailComposer, public admob: AdMobPro, private push: Push, public market: Market, public storage: Storage, public events: Events, public appversion: AppVersion, public device: Device, public restfulServices: RestfulServicesProvider) {
    // // Subscribe side menu data
    events.subscribe('userinfo:created', (fname, state, genderinfo) => {
      if (fname) {
        this.fname = fname;
      } if (state) {
        this.state = state;
      } if (genderinfo) {
        if (genderinfo === 'male') {
          this.userimg = 'assets/img/male.png'
        } else if (genderinfo === 'famale') {
          this.userimg = 'assets/img/female.png'
        }
      }
    });

    events.subscribe('onAds:bigads', () => {
      this.onAdsClick();
    });

    // // Side menu data
    this.storage.get('fname').then((val) => {
      if (val) {
        this.fname = val;
      } else {
        this.fname = 'User';
      }
    });
    this.storage.get('state').then((val) => {
      if (val) {
        this.state = val;
      } else {
        this.state = 'Location'
      }
    });
    this.storage.get('genderinfo').then((val) => {
      if (val) {
        if (val === 'male') {
          this.userimg = 'assets/img/male.png'
        } else if (val === 'female') {
          this.userimg = 'assets/img/female.png'
        }
      } else {
        this.userimg = 'assets/img/no-photo-profile.jpg';
      }
    });

    // //App version
    this.appversion.getVersionNumber().then(version => {
      this.versionNumber = version;
    });

    // -=EmailComposer=-
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');



    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();

      //back button handle
      //Registration of push in Android and Windows Phone
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      platform.registerBackButtonAction(() => {
        // get current active page
        let view = this.nav.getActive();
        if (view.component.name == "HomePage" || view.id == "HomePage") {
          //Double check to exit app
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            platform.exitApp(); //Exit from app
          } else {
            this.common.presentToast("Press back again to exit App?", "bottom");
            lastTimeBackPress = new Date().getTime();
          }
        } else {
          if (view.component.name == "AboutPage" || view.id == "AboutPage" || view.component.name == "SettingPage" || view.id == "SettingPage" || view.component.name == "BmiCalculatorPage" || view.component.id == "BmiCalculatorPage" || view.component.name == "DietChartPage" || view.component.id == "DietChartPage" || view.component.name == "SlideBurnbellyfatPage" || view.component.id == "SlideBurnbellyfatPage" || view.component.name == "SlideBurnfatfastPage" || view.component.id == "SlideBurnfatfastPage" || view.component.name == "SlideEasywaytoburnPage" || view.component.id == "SlideEasywaytoburnPage" || view.component.name == "SlideFattofittipsPage" || view.component.id == "SlideFattofittipsPage" || view.component.name == "SlideRighttoeatPage" || view.component.id == "SlideRighttoeatPage") {
            this.openPage('HomePage');
          } else if (view.component.name == "DietChartDetailPage" || view.id == "DietChartDetailPage") {
            this.openPage('DietChartPage');
          } else {
            // go to previous page
            this.nav.pop({});
          }
        }
      });

      // -=AdMob=-
      if (platform.is('android')) {
        this.admobid = {
          banner: 'ca-app-pub-868/3532781142',
          interstitial: 'ca-app-pub-8291377848mnb0986214472/9439713944'
        };
      }

      let AdMobOptiond = {
        adId: this.admobid.banner,
        position: admob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true
      };

      admob.createBanner(AdMobOptiond);

      // -=Push Notification=-
      // to check if we have permission
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }
        });

      // to initialize push notifications
      const options: PushOptions = {
        android: {
          senderID: '161741124853',
          "icon": "appicon",
          "iconColor": "lightgray"
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {},
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };

      const pushObject: PushObject = this.push.init(options);
      pushObject.on('registration').subscribe(
        (registration: any) => {
          console.log('Device registered', registration)
          storage.set('notid', registration.registrationId);
        },
        err => {
          console.error("Error : " + err);
        },
        () => {
          console.log('Notification registration completed');
        });
      pushObject.on('notification').subscribe((notification: any) => {
        console.log('Received a notification', notification);
        this.common.presentToast(notification.title, 'top');
      });
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    });

    // // -=watch network 
    this.network.onDisconnect().subscribe(() => {
      this.common.presentToast('Oops! The network was disconnected :-(', "top");
    });
    this.network.onConnect().subscribe(() => {
      this.common.presentToast("We got a " + this.network.type + " connection, woohoo!", "top");
    });

    // // UserData Information
    this.storage.get('userupdatedata').then((val) => {
      if (val == 'true' || val == null) {
        this.storage.get('notid').then((val) => {
          if (val) {
            this.notidinfo = val;
          }
        });
        this.storage.get('notification').then((val) => {
          if (val) {
            this.notificationinfo = val;
          } else {
            this.notificationinfo = true;
          }
        });
        this.storage.get('fname').then((val) => {
          if (val) {
            this.fnameinfo = val;
          } else {
            this.fnameinfo = '';
          }
        });
        this.storage.get('lname').then((val) => {
          if (val) {
            this.lnameinfo = val;
          } else {
            this.lnameinfo = '';
          }
        });
        this.storage.get('email').then((val) => {
          if (val) {
            this.emailinfo = val;
          } else {
            this.emailinfo = '';
          }
        });
        this.storage.get('state').then((val) => {
          if (val) {
            this.stateinfo = val;
          } else {
            this.stateinfo = '';
          }
        });
        this.storage.get('genderinfo').then((val) => {
          if (val) {
            this.genderinfo = val;
          } else {
            this.genderinfo = '';
          }
        });
        this.storage.get('deviceid').then((val) => {
          if (val) {
            this.deviceidinfo = val;
          } else {
            setTimeout(() => {
              this.deviceidinfo = this.device.uuid;
            }, 1000);
          }
        });
        setTimeout(() => {
          if (this.notidinfo) {
            this.userPostData = {
              "notid": this.notidinfo,
              "notidstatus": this.notificationinfo,
              "phoneid": this.deviceidinfo,
              "fname": this.fnameinfo,
              "lname": this.lnameinfo,
              "email": this.emailinfo,
              "address": this.stateinfo,
              "gender": this.genderinfo,
              "phone": ""
            };
            this.restfulServices.postData(this.userPostData, 'signup')
              .then((result) => {
                this.resposeData = result;
                console.log("Token: ", this.resposeData.userData.token);
                if (this.resposeData.userData.token) {
                  this.storage.set('apptoken', this.resposeData.userData.token);
                  this.storage.set('userupdatedata', 'false');
                }
                else {
                  this.storage.set('userupdatedata', 'true');
                }
              }, (err) => {
                console.log(err);
              });
          } else {
            console.log("Data not found : notidinfo");
          }
        }, 10000);
      }
    });


  }

  onAdsClick() {
    console.log('onAdsClick function');
    this.admob.prepareInterstitial({ adId: this.admobid.interstitial })
      .then(() => { this.admob.showInterstitial(); });
  }

  errorHandler(event) {
    event.target.src = "assets/img/no-photo-profile.jpg";
  }

  openPage(data) {
    this.nav.setRoot(data);
  }

  shareviaemail() {
    this.emailComposer.open({
      app: 'gmail',
      to: 'support@test.com',
      cc: '',
      bcc: [],
      attachments: [],
      subject: 'Fat To Fit Application Suggestion/Complain',
      body: "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title></title></head><body><div>==========================<br>Device Information<br>==========================</div><div> App Version = " + this.versionNumber + "<br>Phone = " + this.device.model + "<br>Android Version = " + this.device.version + "<br>Phone ID = " + this.device.uuid + "</div><div>--------------------------------------------------</div><div>Love this app. Works great on my mobile.</div></body></html>",
      isHtml: true
    });
  }

  openmarket() {
    this.market.open('com.testapps.fattofittips');
  }

}


