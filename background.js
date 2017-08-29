var message="";
chrome.runtime.onInstalled.addListener(function (object){
    if(object.reason === "install"){
        chrome.tabs.create({url: "./startup.html"}, function (tab){
            console.log("opened new tab!");
        });
    }
});

chrome.browserAction.onClicked.addListener(function (tab){

    chrome.tabs.executeScript(null, {
        file: "getPage.js"
    }, function() {
        if(chrome.runtime.lastError){
            console.log("Error when injecting script");
            chrome.notifications.create({type: "basic", iconUrl: "./icon64.png", title: "Fail", message: "錯誤/找不到頁面，正確網址應該長這樣: https://www.facebook.com/groups/123456789111/members/"});
        }
    });


});

chrome.runtime.onMessage.addListener(function (request, sender){
    if(request.action == "getSource") {
        message = "";
        var dum = document.createElement("html");
        dum.innerHTML = request.source;
        var arr = dum.getElementsByClassName("fsl fwb fcb");
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
    if(message == ""){
        chrome.notifications.create({type: "basic", iconUrl: "./icon64.png", title: "Fail", message: "錯誤/找不到頁面，正確網址應該長這樣: https://www.facebook.com/groups/123456789111/members/"});
    }  
    else{
        cpyText();
    }
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