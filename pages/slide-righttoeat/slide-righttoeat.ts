import { CommonProvider } from './../../providers/common/common';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-slide-righttoeat',
  templateUrl: 'slide-righttoeat.html',
})
export class SlideRighttoeatPage {
  @ViewChild(Slides) slides: Slides;

  newsData: number = 11;
  loading: any;

  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider) {
    this.getdata();
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false, 'sidemenu');
  }

  getNumber(num) {
    return new Array(num);
  };

  slideNextInfo() {
    this.slides.slideNext();
  }

  slidePrevInfo() {
    this.slides.slidePrev();
  }
  getdata() {
    this.common.presentLoading();
    setTimeout(() => {
      this.common.closeLoading();
    }, 2500);
  }
}


