import { CommonProvider } from './../../providers/common/common';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, MenuController } from 'ionic-angular';

import { JsonProvider } from './../../providers/json/json';

@IonicPage()
@Component({
  selector: 'page-slide-easywaytoburn',
  templateUrl: 'slide-easywaytoburn.html',
  providers: [JsonProvider]
})
export class SlideEasywaytoburnPage {
  @ViewChild(Slides) slides: Slides;

  newsData: any;
  loading: any;
  jsonData: any;

  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, private jsonProvider: JsonProvider, public common: CommonProvider) {
    this.getdata();
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'sidemenu');
  }

  slideNextInfo() {
    this.slides.slideNext();
  }

  slidePrevInfo() {
    this.slides.slidePrev();
  }

  getdata() {
    this.common.presentLoading();
    this.jsonData = this.jsonProvider.getJsonDataEasy();
    this.newsData = this.jsonData.data;
    if (this.newsData) {
      console.log('getData completed');
      this.common.closeLoading();
    } else {
      console.error("Error : Json not loaded from provider");
      this.common.closeLoading();
    }
  }
}
