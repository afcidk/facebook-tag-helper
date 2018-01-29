//show startup.html when first installed
chrome.runtime.onInstalled.addListener(function (object){
    if(object.reason === "install"){
        chrome.tabs.create({url: "./startup.html"}, function (tab){
            console.log("opened new tab!");
        });
    }
});

//onClick icon, run contentScript
chrome.browserAction.onClicked.addListener(function (tab){
	console.log("wil execute");
    chrome.tabs.executeScript(null, {
		file: "contentScript.js"
    }, function() {
        if(chrome.runtime.lastError){
            console.log(chrome.runtime.lastError);
            //printErrorMessage();
        }
    });
});

function printErrorMessage(){
    chrome.notifications.create({type: "basic", iconUrl: "./icon64.png", title: "Fail", message: "錯誤/找不到頁面，正確網址應該以          https://www.facebook.com/groups/ 或是 https://www.facebook.com/messages/t/ 開頭喔^^"});
    
}
