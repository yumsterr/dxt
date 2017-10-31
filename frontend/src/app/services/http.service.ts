import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  constructor() { }

  request(params) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

  }
}
