import { JsonProvider } from './../../providers/json/json';
import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Market } from '@ionic-native/market';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  newsData;
  jsonData;
  constructor(public navCtrl: NavController, public navParams: NavParams, private market: Market, public events: Events, public common: CommonProvider, public network: Network ,public jsonProvider: JsonProvider) {
    this.getdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  playstore(data) {
    this.market.open(data);
  }

  bigAds() {
    this.events.publish('onAds:bigads');
  }

  openPage(url) {
    if (this.network.type !== 'none') {
      this.common.openpage(url);
    } else {
      this.common.presentToast("Please check your network connection!!!", "top")
    }
  }

  getdata() {
    this.common.presentLoading();
    // this.jsonData = this.jsonProvider.getJsonAboutUs().data;
    // this.newsData = this.jsonData.data;
    this.newsData = this.jsonProvider.getJsonAboutUs().data;
    if (this.newsData) {
      console.log('getData completed');
      this.common.closeLoading();
    } else {
      console.error("Error : Json not loaded from provider");
      this.common.closeLoading();
    }
  }
}
