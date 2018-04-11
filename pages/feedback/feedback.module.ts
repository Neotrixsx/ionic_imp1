import { ElasticModule } from 'angular2-elastic';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackPage } from './feedback';

@NgModule({
  declarations: [
    FeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackPage),
    ElasticModule
  ],
})
export class FeedbackPageModule {}
