import { Injectable } from '@angular/core';

@Injectable()
export class WebWorkerService {

  messageWorker: Worker = new Worker(new URL('../../web-workers/message.worker', import.meta.url));


  constructor() {
  }

  postMessage(message: any) {

    this.messageWorker.onmessage = function(event) {
      const data = event.data;
    };

    const that = this;

    setTimeout(() => {
      that.messageWorker.postMessage(message);
    }, 500);
  }
}
