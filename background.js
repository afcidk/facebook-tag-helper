var message="";
var url="";
//show startup.html when first installed
chrome.runtime.onInstalled.addListener(function (object){
    if(object.reason === "install"){
        chrome.tabs.create({url: "./startup.html"}, function (tab){
            console.log("opened new tab!");
        });
    }
});

//onClick icon
chrome.browserAction.onClicked.addListener(function (tab){
        
    chrome.tabs.query({"active": true, "status": "complete"}, function (tab){
        url = tab[0].url;
    });

    chrome.tabs.executeScript(null, {
        file: "getPage.js"
    }, function() {
        
        if(chrome.runtime.lastError){
            console.log(chrome.runtime.lastError);
            printErrorMessage();
        }
    });
});

chrome.runtime.onMessage.addListener(function (request, sender){
    if(request.action == "getSource") {
        var arr = "";
        message = "";
        var dum = document.createElement("html");
        console.log(url);
        
        dum.innerHTML = request.source;
        if(url.length>=32 && url.substring(0, 32)==="https://www.facebook.com/groups/"){
            //catch club page(url)
            arr = dum.getElementsByClassName("fsl fwb fcb");
        }
        else if(url.length>=36 && url.substring(0, 36)==="https://www.facebook.com/messages/t/"){
            //catch group page(url)
            arr = dum.getElementsByClassName("_364g");
        }
        
        var record = [];
        for(var i=0; i<arr.length; i++){
            var text = arr[i].innerText.split(" ")[0];
            var skip=false;
            for(var j=0; j<record.length; j++){
                if(text == record[j]){
                    skip=true;
                    break;
                }
            }
            if(skip == true)    continue;
            message = message + "@"+text+" ";
            console.log(arr[i].innerText);
            record.push(text)
        }
    }
    if(message == "")   printErrorMessage();
    else  cpyText();
});


function cpyText(){

    var dum = document.createElement("input");
    document.body.appendChild(dum);
    dum.setAttribute("id", "dum");
    dum.select();
    document.execCommand("copy");
    document.getElementById("dum").value = message;
    dum.select();
    document.execCommand("copy");
    document.body.removeChild(dum);
    chrome.notifications.create({type: "basic", iconUrl: "./icon64.png", title: "Success", message: "複製成功!"});
};

function printErrorMessage(){
    chrome.notifications.create({type: "basic", iconUrl: "./icon64.png", title: "Fail", message: "錯誤/找不到頁面，正確網址應該以          https://www.facebook.com/groups/ 或是 https://www.facebook.com/messages/t/ 開頭喔^^"});
    
}