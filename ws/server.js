"use strict";

// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(webSocketsServerPort, function() { });

// create the server
var wsServer = new WebSocketServer({
    httpServer: server
});

//create an array to hold your players
var players = [];
var controls = [];

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            try {
                var msg = JSON.parse(message.utf8Data);
                var type = msg.type;
                var data = msg.data;

                if (type == "id") {
                    if (data == "player") {
                        players.push(connection)
                    } else {
                        controls.push(connection)
                    }
                } else {
                    for(var i = 0; i < players.length; i++) {
                        players[i].sendUTF(message.utf8Data);
                    }
                }
            } catch (e) {
                console.log(e.name)
                console.log(e.message)
            }
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });

    console.log("client connected")
    var msg = {
	type: "connection ACK",
	data: "OK",
    }
    connection.sendUTF(JSON.stringify(msg))
});
