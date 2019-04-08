/****************************************
  NODE JS
****************************************/
// Apache version 2.4 and earlier
var ws = new WebSocket('ws://'+ location.host +'/ws');
// Apache older versions
//var ws = new WebSocket('ws://192.168.0.19:1337');

function sendMessage(message_type, message_data) {
    var msg = {
        type : message_type,
        data : message_data,
    }

    ws.send(JSON.stringify(msg));
}

ws.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    var type = msg.type;
    var data = msg.data;

    switch (type) {
        case "connection ACK":
	    sendMessage("id", "player");
            break;
        case "radio":
            if (data == "sympa")
                playLaRadioSympa();
            else
                playRadioMeuh();
            break;
        case "youtube":
            playYouTubeVideo(data);
            break;
    }
};

/****************************************
 * HTML Frames
 ***************************************/
var noMediaText
var youtubeFrame
var radioFrame
var radioImage
var radioPlayer

function bodyLoaded() {
    noMediaText = document.getElementById("no-media");
    youtubeFrame = document.getElementById("youtubePlayer");
    radioFrame = document.getElementById("radioFrame");
    radioImage = document.getElementById("radioImage");
    radioPlayer = document.getElementById("radioPlayer");
}

function playYouTubeVideo(newVideoId) {
    noMediaText.style.display = "none";
    youtubeFrame.style.display = "inline";
    radioFrame.style.display = "none";
    radioPlayer.pause();
    youtubePlayer.stopVideo();
    youtubePlayer.loadVideoById(newVideoId, 0, "large")
    youtubePlayer.playVideo();
}

function playLaRadioSympa() {
    noMediaText.style.display = "none";
    youtubeFrame.style.display = "none";
    youtubePlayer.stopVideo();
    radioFrame.style.display = "inline";
    radioImage.src = "images/laradiosympa.jpg"
    radioPlayer.src = "http://radio2.pro-fhi.net:9095/index.html/stream;";
    radioPlayer.play();
}

function playRadioMeuh() {
    noMediaText.style.display = "none";
    youtubeFrame.style.display = "none";
    youtubePlayer.stopVideo();
    radioFrame.style.display = "inline";
    radioImage.src = "images/radiomeuh.png"
    radioPlayer.src = "http://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3";
    radioPlayer.play();
}
