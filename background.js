chrome.browserAction.onClicked.addListener(function(tab){
    // executeScrit$B$NBh0l0z?t$N%G%U%)%k%HCM$O%"%/%F%#%V$J%?%V$N(BID
    chrome.tabs.executeScript(tab.id, {code:'picsCollector.toggle();'});
});
// updateIcon();









