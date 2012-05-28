chrome.extension.onRequest.addListener(
  function(message, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    
    switch(message.type){
    default:
    	sendResponse("hello");	
    }
  }
);
