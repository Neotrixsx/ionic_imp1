import { CommonProvider } from './../../providers/common/common';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[limit-to]', // Attribute selector
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class LimitToDirective {

  constructor(public common: CommonProvider) {
    console.log('Hello LimitToDirective Directive');
  }
  @Input('limit-to') limitTo;
  _onKeypress(e) {
    const limit = +this.limitTo;
    if (e.target.value.length === limit) {
      e.preventDefault();
      console.log("exid...");
      this.common.presentToast("Only 3 character limit!!!", "top");
    }
  }
}
