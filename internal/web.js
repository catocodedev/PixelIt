// imports
const http = require('http');
const fs = require('fs');

exports.run = function(port) {

// run server
http.createServer(function (req, res) {
  //router
  var url = req.url.split("?")[0];
  console.log(url)
  if (url.endsWith("/")) {
    var file = "web/"+ url + "home.html"
    if (fs.existsSync(file)) {
    console.log("Rendering home page")
    }else{
      console.log('server can not find | ' + file +' |')
       file = "web/404.html"
    }
  }
  else if (!url.includes('.')) {
    var file = "web"+url+".html"
      if (fs.existsSync(file)) {
        console.log("Rendering " + file)
      }
     else{
      console.log('server can not find | ' + file +' |')
       file = "web/404.html"   
     }
  }
  else{
    var file = "./web"+url
    if (fs.existsSync(file)) {
      console.log("| " + file + ' | is a valid file')
    }
   else{
    console.log('server can not find |' + file +' |')
     file = "web/404.html"
   }
  }
  // render file
  fs.readFile(file, function(err, data) {
    if (file.endsWith(".html")) {
  res.writeHead(200, {'Content-Type': 'text/html'});
    }else{
        res.writeHead(200, {'Content-Type': 'text/plain'});
    }
  if (err) throw err;
  res.write(data);
  return res.end();
  });
  console.log(url)

}).listen(port);   
console.log("Server ready on port:" + port)
}