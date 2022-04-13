var ws = new WebSocket("ws://localhost:8060");
var result = document.getElementById("result");

// place a pixel on the canvas
function placePixel(x, y,color) {
    if(time == 0){
    if (x < 0 || x > 999 || y < 0 || y > 500) {
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
    result.innerHTML = "Pixel placed";
    time = 40;
    return "Pixel placed";
}
    }
else{
    result.innerHTML = "cool down";
    return "cool down";
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
        placecanvas(data.canvas[i].x, data.canvas[i].y, data.canvas[i].color);
    }
    }
    else if (data.channel == "pixel") {
        console.log(data.pixel+ " is a placed");
        placecanvas(data.pixel.x, data.pixel.y, data.pixel.color);
    }
}
}
var time = 0;
var button = document.getElementById("place");
          button.onclick = function() {
            var x = document.getElementById("x").value;
            var y = document.getElementById("y").value;
            var color = document.getElementById("color").value;
            if(x == "" || y == "" || color == ""){
                result.innerHTML = "Please fill in all fields";
            }else{
        placePixel(x, y, color);
            }
        }
    setInterval(function(){
        if (time > 0) {
            result.innerHTML = time;
            console.log(time);
        time--;
        }else{
            result.innerHTML = "pixel ready!";
        }
    }, 1000);