import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { Device } from '@ionic-native/device';
import { CommonProvider } from './../../providers/common/common';
import { RestfulServicesProvider } from './../../providers/restful-services/restful-services';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  inputDisabled;
  notification;
  deviceid;
  fname;
  lname;
  state;
  email;
  genderinfo;
  validemail;
  notidinfo;
  userPostData;
  resposeData;


  constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device, public restfulservices: RestfulServicesProvider, public common: CommonProvider, public storage: Storage, public modalCtrl: ModalController, public network: Network, public events: Events) { }

  ionViewDidEnter() {
    console.log('ionViewDidEnter SettingPage');
    console.log('this.network.type:', this.network.type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');

    this.inputDisabled = true;
    this.common.presentLoading()
    this.notification = false;

    setTimeout(() => {
      this.deviceid = this.device.uuid;
    }, 1000);
    this.storage.get('notification').then((val) => {
      if (val) {
        this.notification = val;
      }
      else {
        this.notification = true;
      }
    });
    this.storage.get('deviceid').then((val) => {
      this.deviceid = val;
    });
    this.storage.get('fname').then((val) => {
      this.fname = val;
    });
    this.storage.get('lname').then((val) => {
      this.lname = val;
    });
    this.storage.get('email').then((val) => {
      this.email = val;
    });
    this.storage.get('state').then((val) => {
      this.state = val;
    });
    this.storage.get('genderinfo').then((val) => {
      this.genderinfo = val;
    });
    this.common.closeLoading();
  }

  openModal(modalpage) {
    if (this.network.type !== 'none') {
      let chooseModal = this.modalCtrl.create(modalpage);
      chooseModal.onDidDismiss(data => {
        this.state = data;
      });
      chooseModal.present();
    } else {
      this.common.presentToast('Please check your network connection!!', 'top');
    }
  }

  notificationnotify() {
    console.log("notificationnotify: " + this.notification);
  }
  onGenderChange() {
    console.log("onGenderChange: " + this.genderinfo);
  }

  checkemail(emaildata) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emaildata.target.value) == true) {
      this.validemail = false;
    }
    else {
      this.validemail = true;
    }
  }

  useretting() {
    this.common.presentLoading();
    this.storage.get('fname').then((val) => {
      if (this.fname !== val) {
        this.storage.set('userupdatedata', 'true');
      }
    });
    this.storage.get('lname').then((val) => {
      if (this.lname !== val) {
        this.storage.set('userupdatedata', 'true');
      }
    });
    this.storage.get('email').then((val) => {
      if (this.email !== val) {
        this.storage.set('userupdatedata', 'true');
      }
    });
    this.storage.get('state').then((val) => {
      if (this.state !== val) {
        this.storage.set('userupdatedata', 'true');
      }
    });
    this.storage.get('genderinfo').then((val) => {
      if (this.genderinfo !== val) {
        this.storage.set('userupdatedata', 'true');
      }
    });

    if (this.deviceid && this.fname && this.lname && this.email && this.state && this.genderinfo) {
      if (!this.validemail) {
        this.storage.set('notification', this.notification);
        this.storage.set('deviceid', this.deviceid);
        this.storage.set('fname', this.fname);
        this.storage.set('lname', this.lname);
        this.storage.set('email', this.email);
        this.storage.set('state', this.state);
        this.storage.set('genderinfo', this.genderinfo);
        this.events.publish('userinfo:created', this.fname, this.state, this.genderinfo);
        this.common.presentToast('Information updated successfully!!', 'top');

        if (this.network.type !== 'none') {
          this.storage.get('notid').then((val) => {
            this.notidinfo = val;

            this.userPostData = {
              "notid": this.notidinfo,
              "notidstatus": this.notification,
              "phoneid": this.deviceid,
              "fname": this.fname,
              "lname": this.lname,
              "email": this.email,
              "address": this.state,
              "gender": this.genderinfo,
              "phone": ""
            };
            this.restfulservices.postData(this.userPostData, 'signup')
              .then((result) => {
                this.resposeData = result;
                console.log("this.resposeData.userDetails.Token: ", this.resposeData.userData.token);
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
            this.common.closeLoading();
          });
        } else {
          this.common.closeLoading();
          this.storage.set('userupdatedata', 'true');
        }
      } else {
        this.common.closeLoading();
        this.common.presentToast('Please enter your valid email address', 'top');
      }
    } else {
      this.common.presentToast('Please enter all required field', 'top');
      this.common.closeLoading();
    }
  }

  openPage(url) {
    if (this.network.type !== 'none') {
      this.common.openpage(url);
    } else {
      this.common.presentToast("Please check your network connection!!!", "top")
    }
  }
}
