const customPostMessage: any = postMessage;
// Worker API
onmessage = function (event) {
  var command = event.data[0];
  var waitTimeForRetry = Number(event.data[1]) * 2000;
  if (command === 'Should-Reconnect-Websocket') {
    setTimeout(reconnectNow, waitTimeForRetry);
    function reconnectNow() {
      customPostMessage('Connect-Now')
    }
  }
  else {
    const workerResult = 'Unknown command!';
    customPostMessage(workerResult);
  }
};

