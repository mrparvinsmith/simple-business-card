var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var db = require('./config/db');

var app = express();

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use( express.static(path.join(__dirname + '/public')));


app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'unicorns', resave: false, saveUninitialized: false }));

var userRoutes = require('./routes/users');

app.get('/', function(req, res){
  res.render('index');
});

app.use('/users', userRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on ' + port);
});
