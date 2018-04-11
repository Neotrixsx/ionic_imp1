import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalGooglepalcesautocompletePage } from './modal-googlepalcesautocomplete';
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';

@NgModule({
  declarations: [
    ModalGooglepalcesautocompletePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalGooglepalcesautocompletePage),
    GooglePlacesAutocompleteComponentModule
  ],
})
export class ModalGooglepalcesautocompletePageModule {}
