/*
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var createSendToken = require('./services/jwt.js');
var googleAuth = require('./services/googleAuth.js');
var facebookAuth = require('./services/facebookAuth.js');
var localStrategy = require('./services/localStrategy.js');
var jobs = require('./services/jobs.js');
var emailVerification = require('./services/emailVerification.js');
var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
passport.use('local-register', localStrategy.register);
passport.use('local-login', localStrategy.login);
app.post('/register', passport.authenticate('local-register'), function (req, res) {
    emailVerification.send(req.user.email);
    createSendToken(req.user, res);
});
app.get('/auth/verifyEmail', emailVerification.handler);
app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});
app.post('/auth/facebook', facebookAuth);
app.get('/jobs', jobs);
app.post('/auth/google', googleAuth);
mongoose.connect('mongodb://localhost/psjwt');
var server = app.listen(3000, function () {
    console.log('api listening on ', server.address().port);
});
*/
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var UserM = require('./models/User.js'); 

//jwt à la main
//var jwt = require('./services/jwt.js'); 
var jwt = require('jwt-simple'); 


app.use(bodyParser.json());

app.use(function (req, res, next) {
    //enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/register', function (req, res) {
    console.log(req.body);
    var user = req.body;
    var newUser =  new UserM.model({
        email: user.email,
        password: user.password
    });
    
    var payload = {
        iss: req.hostname, 
        sub: newUser.id, 
    }
    
    var token = jwt.encode(payload, 'shhhhh....'); 
    
    newUser.save(function (err) {
        //res.status(200).json(newUser);
        //on retourne l'objet new User sans le password
        res.status(200).json({
            user: newUser.toJSON(), 
            token: token
        }); 
    })
});


var jobs = ['des trucs', 'ou on a  accès que','quand ', 'on est ', 'identifié', 'avec un token']; 

app.get('/jobs', function(req, res){
    
    if(!req.headers.authorization){
        return res.status(401).send({message: "pas le droit mec"}); 
    }
    
    var token = req.headers.authorization.split(' ')[1]; 
    var payload = jwt.decode(token, 'shhhhh....'); 
    if(!payload.sub){
        res.status(401).send({message:"Fail authent"}); 
    }

    res.json(jobs); 
})

mongoose.connect('mongodb://localhost/jwtTuto');


//test du jwt 
//console.log(jwt.encode('hi', 'secret')); 

var server = app.listen(3000, function () {
    console.log('api listening on', server.address().port);
})