import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bmi-calculator',
  templateUrl: 'bmi-calculator.html',
})
export class BmiCalculatorPage {

  userheight: any;
  userweight: any;
  caluserheight: any;
  caluserweight: any;
  hunit: any = "";
  wunit: any = "";
  bmivalue: any;
  bmiinfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BmiCalculatorPage');
  }
  onHeightChange(selectedValue: any) {
    this.hunit = selectedValue;
  }
  onWeightChange(selectedValue: any) {
    this.wunit = selectedValue;
  }
  calculateBMI() {
    if (this.hunit && this.wunit) {
      if (this.userheight && this.userweight) {
        this.caluserheight = this.userheight;
        this.caluserweight = this.userweight;
        if (this.hunit == "inches") {
          this.caluserheight /= 39.3700787;
        }
        if (this.wunit == "pounds") {
          this.caluserweight /= 2.20462;
        }
        let BMI = this.caluserweight / Math.pow(this.caluserheight, 2);
        console.log('BMI: ' + BMI);
        this.bmivalue = Math.round(BMI * 100) / 100;

        if (this.bmivalue > 40) {
          this.bmiinfo = "You are grossly obese, consult your physician!";
        }
        else if (this.bmivalue > 30 && this.bmivalue <= 40) {
          this.bmiinfo = "Umm... You are obese, want some liposuction?";
        }
        else if (this.bmivalue > 27 && this.bmivalue <= 30) {
          this.bmiinfo = "You are very fat, do something before it's too late";
        }
        else if (this.bmivalue > 22 && this.bmivalue <= 27) {
          this.bmiinfo = "You are fat, need dieting and exercise";
        }
        else if (this.bmivalue >= 21 && this.bmivalue <= 22) {
          this.bmiinfo = "I envy you. Keep it up!!";
        }
        else if (this.bmivalue >= 18 && this.bmivalue < 21) {
          this.bmiinfo = "You are thin, eat more.";
        }
        else if (this.bmivalue >= 16 && this.bmivalue < 18) {
          this.bmiinfo = "You are starving. Go Find some food!";
        }
        else if (this.bmivalue < 16) {
          this.bmiinfo = "You're grossly undernourished, need hospitalization ";
        }
      } else {
        if (!this.userheight) {
          this.common.presentToast('Please enter your correct Height value', 'top');
        } else if (!this.userweight) {
          this.common.presentToast('Please enter your correct Weight value', 'top');
        }
      }
    } else {
      if (!this.hunit) {
        this.common.presentToast('Please select Height unit', 'top');
      } else if (!this.wunit) {
        this.common.presentToast('Please select Weight unit', 'top');
      }
    }
  }
}
