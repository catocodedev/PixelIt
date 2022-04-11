const web = require('./internal/web.js');
const api = require('./internal/api.js');

web.run(8080);
api.start(8060);