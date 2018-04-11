import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JsonProvider } from './../../providers/json/json';

import { CommonProvider } from './../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-diet-chart',
  templateUrl: 'diet-chart.html',
  providers: [JsonProvider]
})
export class DietChartPage {
  newsData: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private jsonProvider: JsonProvider, public common: CommonProvider) {
    this.getdata();
  }

  ionViewDidEnter() { }

  getdata() {
    this.common.presentLoading();
    this.jsonProvider.getJsonDataDays().subscribe(
      result => {
        this.newsData = result.data;
        this.common.closeLoading();
        console.log("Success : " + this.newsData);
      },
      err => {
        this.common.closeLoading();
        console.error("Error : " + err);
      },
      () => {
        this.common.closeLoading();
        console.log('getData completed');
      }
    );
  }

  itemSelected(selected) {
    this.navCtrl.push("DietChartDetailPage", {
      param: selected
    });
  }
}
