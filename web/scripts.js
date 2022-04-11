var ws = new WebSocket("ws://localhost:8060");

// place a pixel on the canvas
function placePixel(x, y,color) {
    if (x < 0 || x > 500 || y < 0 || y > 500) {
        return "Pixel out of bounds";
    } else {
    // send the pixel to the server
    ws.send(JSON.stringify({
        "channel": "pixel",
        "pixel": {
        "x": x,
        "y": y,
        "color": color
    }
    }));
    return "Pixel placed";
}
}
function placecanvas(x, y, color) {
    var c = document.getElementById("pixelCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}
ws.onerror = function (event) {
    console.log("error");
};
// get the canvas array form the server
ws.onopen = function (event) {
ws.send(JSON.stringify({"channel": "canvas", "action": "get"}));
ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    if (data.channel == "canvas") {
        console.log("Receiving canvas array from server");
    for (var i = 0; i < data.canvas.length; i++) {
        console.log(data.canvas[i]);
        placecanvas(data.canvas[i].x, data.canvas[i].y, data.canvas[i].color);
    }
    }
    else if (data.channel == "pixel") {
        console.log(data.pixel+ " is a placed");
        placecanvas(data.pixel.x, data.pixel.y, data.pixel.color);
    }
}
}
var button = document.getElementById("place");
          button.onclick = function() {
            var x = document.getElementById("x").value;
            var y = document.getElementById("y").value;
            var color = document.getElementById("color").value;
            var result = document.getElementById("result");
            if(x == "" || y == "" || color == ""){
                result.innerHTML = "Please fill in all fields";
            }else{
            var e = placePixel(x, y, color);
            result.innerHTML = e;
            }
          }
// for (var i = 0; i < 100; i++) {
//     placePixel(i,i,"000")
// }