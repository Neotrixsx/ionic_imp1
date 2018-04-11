import { CommonProvider } from './../../providers/common/common';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, MenuController } from 'ionic-angular';

import { JsonProvider } from './../../providers/json/json';

@IonicPage()
@Component({
  selector: 'page-slide-fattofittips',
  templateUrl: 'slide-fattofittips.html',
  providers: [JsonProvider]
})
export class SlideFattofittipsPage {
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
      this.jsonData = this.jsonProvider.getJsonDataAmain();
      this.newsData = this.jsonData.data;
      if (this.newsData) {
        console.log('getData completed');
        this.common.closeLoading();
      } else {
        console.error("Error : Json not loaded from provider");
        this.common.closeLoading();
      }
    }
    
    // getdata() {
    //   console.log('test');
  
    //   this.loading.present();
    //   this.jsonProvider.getJsonDataAmain().subscribe(
    //     result => {
    //       this.newsData = result.data;
    //       console.log("Success : " + this.newsData);
    //     },
    //     err => {
    //       console.error("Error : " + err);
    //     },
    //     () => {
    //       this.loading.dismiss();
    //       console.log('getData completed');
    //     }
    //   );
    // }
  }
  