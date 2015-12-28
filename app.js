var express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes/index'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

var app = express();
app.use(session({secret: 'my secret'}));
app.set('view engine', 'jade');

app.use('/', routes);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('MongoDB management system app running at http://%s:%s', host, port);
});


