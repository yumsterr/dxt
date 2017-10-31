import { Injectable } from '@angular/core';
import { ToastrService } from './toastr.service';

@Injectable()
export class HttpService {

  constructor(public toastrService: ToastrService) { }

  request(params) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

  }
}
