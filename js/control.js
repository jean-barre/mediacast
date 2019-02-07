var ws = new WebSocket('ws://'+ location.host +'/ws');

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
    	    sendMessage("id", "control");
            break;
    }
};

function playYouTubeVideo(element) {
    sendMessage("youtube", element.getAttribute("link"));
}

function playLaRadioSympa() {
    sendMessage("radio", "sympa");
}

function playRadioMeuh() {
    sendMessage("radio", "meuh");
}
