chrome.browserAction.onClicked.addListener(function(tab){
    // executeScritの第一引数のデフォルト値はアクティブなタブのID
    chrome.tabs.executeScript(tab.id, {code:'picsCollector.toggle();'});
});
// updateIcon();









