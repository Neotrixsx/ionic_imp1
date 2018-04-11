import { Network } from '@ionic-native/network';
import { RestfulServicesProvider } from './../../providers/restful-services/restful-services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from './../../providers/common/common';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';


@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  myemail;
  myfeedback;
  validemail;
  versionNumber;
  feedback = {
    "email": "",
    "message": "",
    "devicemodel": "",
    "androidversion": "",
    "appversion": "",
  }
  resposeData;

  constructor(public navCtrl: NavController, public navParams: NavParams, public device: Device, public appversion: AppVersion, public common: CommonProvider, public restfulServices: RestfulServicesProvider, public network: Network) {
    // -=Device Info=-
    // console.log('Device model is: ' + this.device.model);
    // console.log('Device version is: ' + this.device.version);
    // console.log('Device manufacturer is: ' + this.device.manufacturer);
    // console.log('Device serial is: ' + this.device.serial);

    // -=AppVersion=-
    this.appversion.getVersionNumber().then(version => {
      this.versionNumber = version;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
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

  sendFeedback() {
    this.common.presentLoading();
    if (this.network.type !== 'none') {
      if (this.myemail && this.myfeedback) {
        if (!this.validemail) {
          this.feedback = {
            "email": this.myemail,
            "message": this.myfeedback,
            "devicemodel": this.device.model,
            "androidversion": this.device.version,
            "appversion": this.versionNumber
          }
          this.restfulServices.postData(this.feedback, 'userfeedback')
            .then((result) => {
              this.resposeData = result;
              if (this.resposeData.userData === "success") {
                // console.log(this.resposeData);
                console.log("ResposeData: ",JSON.stringify(this.resposeData));
                this.myemail = "";
                this.myfeedback = "";
                this.common.presentToast('Thank you for having taken your time to provide us with your valuable feedback', 'middle');
              }
              else {
                this.common.presentToast('Oops! Something went wrong, please try again...', 'top');
              }
            }, (err) => {
              this.common.presentToast('Oops! Something went wrong, please try again...', 'top');
            });
          this.common.closeLoading();
        } else {
          this.common.closeLoading();
          this.common.presentToast('Please enter your valid email address', 'top');
        }
      } else {
        this.common.closeLoading();
        this.common.presentToast('Please enter all required field', 'top');
      }
    } else {
      this.common.closeLoading();
      this.common.presentToast("Please check your network connection!!!", "top");
    }
  }
}
