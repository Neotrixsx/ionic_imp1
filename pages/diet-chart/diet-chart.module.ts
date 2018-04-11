import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DietChartPage } from './diet-chart';

@NgModule({
  declarations: [
    DietChartPage,
  ],
  imports: [
    IonicPageModule.forChild(DietChartPage),
  ],
})
export class DietChartPageModule {}
