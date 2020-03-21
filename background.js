//show startup.html when first installed
chrome.runtime.onInstalled.addListener(function (object){
    if(object.reason === "install"){
        chrome.tabs.create({url: "./startup.html"});
    }
});

//onClick icon, run contentScript
chrome.browserAction.onClicked.addListener(function (tab){
    chrome.tabs.executeScript(null, {
		file: "contentScript.js"
    }, function() {
        if(chrome.runtime.lastError){
            printErrorMessage();
        }
    });
});

function printErrorMessage(){
    chrome.notifications.create({type: "basic", iconUrl: "./icon64.png", title: "Fail", message: "錯誤/找不到頁面"});
    
}
