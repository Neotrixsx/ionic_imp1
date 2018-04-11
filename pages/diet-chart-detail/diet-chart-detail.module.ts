import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DietChartDetailPage } from './diet-chart-detail';

@NgModule({
  declarations: [
    DietChartDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DietChartDetailPage),
  ],
})
export class DietChartDetailPageModule {}
