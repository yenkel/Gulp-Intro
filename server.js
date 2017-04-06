var express = require('express');
var app = express();

app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, function() {
    console.log('server is running');
});
