var express = require('express');
var path = require('path');

var app = express();

app.locals.basedir = __dirname + '/views/';
app
    .set('env', process.env.NODE_ENV || 'development')
    .set('port', process.env.PORT || 3000)
    .set('name', 'React Todos')
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'jade')
    .use(express.static(path.join(__dirname, 'public/')));

app.get('/', function(req, res){
	res.render('index');
});

app.listen(app.get('port'), function () {
    console.log(app.get('name'), 'listening on port', app.get('port'));
});
