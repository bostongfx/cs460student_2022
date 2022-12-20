
var msg = {
    driveIndLeft: 0,
    driveIndRight: 0,
    isLeft:0
}


//var ws = new WebSocket("ws://158.121.104.86:8080");
// var ws = new WebSocket("ws://0.0.0.0:8080");
var ws = new WebSocket("ws://54.250.239.217:80");

function receiveDemographicsFromUnity(driveIndLeft, driveIndRight, isLeft) {

    msg.driveIndLeft = driveIndLeft;
    msg.driveIndRight = driveIndRight;
    msg.isLeft = isLeft;


    ws.send(JSON.stringify(msg));

    
}

// send message to build (Unity script method bound to game object) from browser's JS
// can dynamically load assets on demand as user interacts with content, but assetbundles must be built before runtime
function readAndSend(event, gameInstance, string_method) {
    console.log('readAndSend' + event.files);
    const fileList = event.files;
    if (string_method != "ReceiveGLTF") {
        gameInstance.SendMessage("Agent",string_method, URL.createObjectURL(fileList[0]));
    }
    else {
        gameInstance.SendMessage("Agent", "ReceiveGLTF", URL.createObjectURL(fileList[0]));

    }

}

// function readAndSend(event, isAnimFile) {
//     console.log(event.files);
//     const fileList = event.files;
//     console.log(typeof(event.files[0]))

//     if (isAnimFile)
//         myGameInstance.SendMessage("Agent", "ReceiveAnimationFromPage", URL.createObjectURL(fileList[0]));
//     else
//         myGameInstance.SendMessage("Agent", "ReceiveGLTF", event.files[0]);

// }




ws.onopen = function (event) {
    console.log('Connection is open ...');

    //ws.send(msg);
};
ws.onerror = function (err) {
    console.log('err: ', err);
}
ws.onmessage = function (event) {
    console.log(event.data);
    document.body.innerHTML += event.data + 'hi';
};
ws.onclose = function () {
    console.log("Connection is closed...");
}


    
//from here on leave everything as it is
function addId() {
    //setting default values. If the parsing of the workerId fails,
    //99999 will be transmitted.
    var workerId = "99999";
    var iFrameURL = document.location.toString();
    var temp = "";
    //parsing and extracting the workerId
    if (iFrameURL.indexOf("workerId") > 0) {
        if (iFrameURL.indexOf("?") > 0) {
            temp = iFrameURL.split("?")[1];
            if (temp.indexOf("&") > 0) {
                temp = temp.split("&")[2];
                if (temp.indexOf("=") > 0) {
                    workerId = temp.split("=")[1];
                }
            }
        }
    }
    //appending the workerId to the link
    document.links[0].href += "&mtwid=" + workerId;
}
