import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-googlepalcesautocomplete',
  templateUrl: 'modal-googlepalcesautocomplete.html',
})
export class ModalGooglepalcesautocompletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalGooglepalcesautocompletePage');
  }

  detail(data) {
    console.log(data.description);
    this.viewCtrl.dismiss(data.description);
    // this.viewCtrl.dismiss();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
