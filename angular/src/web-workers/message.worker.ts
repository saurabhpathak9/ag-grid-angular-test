const customPostMessage: any = postMessage;
// Worker API
onmessage = function (event) {
  const command = event.data[0];
  const waitTimeForRetry = Number(event.data[1]) * 2000;
  if (command === 'Should-Reconnect-Websocket') {
    setTimeout(reconnectNow, waitTimeForRetry);
    function reconnectNow() {
      customPostMessage('Connect-Now');
    }
  } else {
    const workerResult = 'Unknown command!';
    customPostMessage(workerResult);
  }
};

