import { Injectable } from '@angular/core';
import * as MessageWorker from 'worker-loader!../../web-workers/message.worker.bundle.js';

@Injectable()
export class WebWorkerService {

  messageWorker: Worker = new MessageWorker();

  constructor() {
  }

  postMessage(message:any) {

    this.messageWorker.onmessage = function (event) {
      const data = event.data;
    };

    const that = this;

    setTimeout(function () {
      that.messageWorker.postMessage(message);
    }, 500);
  }
}