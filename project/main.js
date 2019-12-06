const httpServer = require('http-server');

var app = httpServer.createServer({root:"update"});

app.listen(3000);