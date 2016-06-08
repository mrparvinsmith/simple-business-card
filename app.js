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

// app.use('/users', userRoutes);

// nodemailer stuff
var mailer = require('./config/nodemailer');
app.post('/email', function(req,res){
  var myEmail = 'mpvirtualbusinesscard@gmail.com';
  console.log(req.body);
  var recipient = req.body.recipient;
  var mySubject = 'Card sent to ' + recipient;
  var theirSubject = 'Virtual business card from Matt Parvinsmith';
  var myMessage = 'A card was sent to ' + recipient;
  var theirMessage = {
    name: 'Matt Parvinsmith',
    email: 'mrparvinsmith@gmail.com',
    github: 'https://github.com/mrparvinsmith',
    linkedIn: 'https://www.linkedin.com/in/mattparvinsmith',
    phone: '(781)-635-5734',
    // website: 'www.mattparvinsmith.com',
    profession: 'Web Developer',
    city: 'Santa Monica, CA',
  };
  var plainMessage = theirMessage.name + ' - ' + theirMessage.profession + ', ' +
    theirMessage.city + ',<br> ' +
    theirMessage.linkedIn + ' ' + theirMessage.github + ' ' + theirMessage.email + ' ' +
    theirMessage.phone;
  var htmlMessage = '<p>' + theirMessage.name + '<br>' + theirMessage.profession + '<br>' +
    theirMessage.city + '<br>LinkedIn: ' + theirMessage.linkedIn + '<br>Github:' + theirMessage.github +
    '<br>Email: ' + theirMessage.email + '<br>Phone: ' + theirMessage.phone + '</p>';
  mailer(recipient, theirSubject, plainMessage, htmlMessage);
  mailer(myEmail, mySubject, myMessage, '<p>' + myMessage + '</p>');
  res.json({message: 'emails sent'});
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on ' + port);
});
