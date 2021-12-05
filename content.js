chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.text === 'get_dom') {
    sendResponse(document.body.innerHTML);
  }
});