const ws = require('ws');
const fs = require('fs');

exports.start = function(port) {
// create a new websocket server
const wss = new ws.Server({
    port: port
});
console.log("Api ready on port: " + port);
// when the client requests the canvas array send it to the client
var canvas = [];
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        var data = JSON.parse(message);
        // read canvas array from canvas.json
        canvas = JSON.parse(fs.readFileSync('canvas.json', 'utf8'));
        if (data.channel == "canvas") {
            console.log("Sending canvas array to client");
            ws.send(JSON.stringify({"channel":"canvas","canvas":canvas}));
        }else if (data.channel == "pixel") {
            // check if the pixel is already on the canvas
            var found = false;
            for (var i = 0; i < canvas.length; i++) {
                if (canvas[i].x == data.pixel.x && canvas[i].y == data.pixel.y) {
                    found = true;
                    if(canvas[i].color == data.pixel.color){
                        console.log("Pixel already on the canvas");
                    }else{
                        console.log("Pixel already on the canvas but with a different color");
                        canvas[i].color = data.pixel.color;
                        fs.writeFileSync('canvas.json', JSON.stringify(canvas));
                    }
                    break;
                }
            }
            if (!found) {
                canvas.push(data.pixel);
                fs.writeFileSync('canvas.json', JSON.stringify(canvas));
               // send the pixel to all clients
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({"channel":"pixel","pixel":data.pixel}));
            });
            }
        }
    });
});
}