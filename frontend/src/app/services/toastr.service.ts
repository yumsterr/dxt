import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Injectable()
export class ToastrService {

  constructor(public toastr: ToastsManager) {}

  setVCR(vcr) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  show(message) {
    this.toastr.success('qwerqwetqwe', '12312312');
  }

}
