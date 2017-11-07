import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Injectable()
export class ToastrService {

  constructor(public toastr: ToastsManager) { }

  setVCR(vcr) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  show(params) {
    switch (params.type) {
      case 'error':
        this.toastr.error(params.message, params.header);
        break;
      case 'warning':
        this.toastr.warning(params.message, params.header);
        break;
      case 'info':
        this.toastr.info(params.message, params.header);
        break;
      case 'success':
      default:
        this.toastr.success(params.message, params.header);
        break;
    }
  }

}
