function callback() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {text: 'get_dom'}, (dom) => {       
      const re = new RegExp(/playerCaptionsTracklistRenderer.*?(youtube.com\/api\/timedtext.*?)"/);
      const match = re.exec(dom);
  
      if (match != null) {
        const url = match[1];
        chrome.tabs.create({ url: chrome.runtime.getURL(`youcap.html?url=${encodeURIComponent(url)}`) });
      }
    });
  });
}

chrome.action.onClicked.addListener(() => {  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.reload(tabs[0].id, null, callback);
  });
});
