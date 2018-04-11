import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmiCalculatorPage } from './bmi-calculator';

@NgModule({
  declarations: [
    BmiCalculatorPage
  ],
  imports: [
    IonicPageModule.forChild(BmiCalculatorPage),
    DirectivesModule
  ],
})
export class BmiCalculatorPageModule {}
