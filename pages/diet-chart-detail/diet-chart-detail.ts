
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { JsonProvider } from './../../providers/json/json';
import 'rxjs/add/operator/toPromise';

import { CommonProvider } from './../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-diet-chart-detail',
  templateUrl: 'diet-chart-detail.html',
  providers: [JsonProvider]
})
export class DietChartDetailPage {

  newsData: any;
  parameter: any;
  titleno: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private jsonProvider: JsonProvider, public common: CommonProvider, private menu: MenuController) {
    this.parameter = navParams.get('param');
    this.getdata();
  }

  ionViewDidLoad() {
    console.log(this.parameter);
    this.menu.swipeEnable(false, 'sidemenu');
  }


  getdata() {
    this.common.presentLoading();
    this.jsonProvider.getJsonDataDays()
      .map(data => data.data)
      .subscribe(
      data => {
        this.newsData = data.filter(item => item.id === this.parameter + "");
        this.titleno = parseInt(this.parameter) + 1;
        this.common.closeLoading();
        console.log("Success : " + this.titleno);
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
}
