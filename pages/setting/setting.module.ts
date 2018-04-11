import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPage),
    GooglePlacesAutocompleteComponentModule
  ],
})
export class SettingPageModule {}
