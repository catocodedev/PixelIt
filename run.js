const web = require('./internal/web.js');
const api = require('./internal/api.js');
const fs = require('fs');

if(!fs.existsSync('canvas.json')){
    fs.writeFileSync('canvas.json', JSON.stringify([]));
}
web.run(8080);
api.start(8060);