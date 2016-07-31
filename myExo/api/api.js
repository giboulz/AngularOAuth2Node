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
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var UserM = require('./models/User.js');

//jwt à la main
//var jwt = require('./services/jwt.js'); 
var jwt = require('jwt-simple');


app.use(bodyParser.json());
//on dit a express d'utiliser le passport
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});


app.use(function (req, res, next) {
    //enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//local strategy set up

var strategyOption = {
    usernameField: 'email'
};
var loginStrategy = new LocalStrategy(strategyOption, function (email, password, done) {
    var emailUser = {
        email: email
    };
    UserM.findOne(emailUser, function (err, user) {
        if (err) return done(err);

        if (!user) {
            //null pour error, false pour le user.
            return done(null, false, {
                message: 'Wrong email password...'
            });
        }

        user.comparePasswords(password, function (err, isMatch) {
            if (err) return done(err);

            if (!isMatch) {
                return done(null, false, {
                    message: 'Wrong email password...'
                });

            }
            return done(null, user);
        });
    });
});


var registerStrategy = new LocalStrategy(strategyOption, function (email, password, done) {
    var emailUser = {
        email: email
    };
    UserM.findOne(emailUser, function (err, user) {
        if (err) return done(err);

        if (user) {
            //null pour error, false pour le user.
            return done(null, false, {
                message: 'Email already existed'
            });
        }



        var newUser = new UserM({
            email: email,
            password: password
        });

        newUser.save(function (err) {
            done(null, newUser);
        })
    })
});

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);




app.post('/register', passport.authenticate('local-register'), function (req, res) {
    console.log(req.body);

    createTokenAndSendIt(req.user, res);

});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createTokenAndSendIt(req.user, res);

});


function createTokenAndSendIt(user, res) {
    var payload = {
        // iss: req.hostname,
        sub: user.id
    }

    var token = jwt.encode(payload, 'shhhhh....');

    res.status(200).json({
        user: user.toJSON(),
        token: token
    });
}

var jobs = ['des trucs', 'ou on a  accès que', 'quand ', 'on est ', 'identifié', 'avec un token'];

app.get('/jobs', function (req, res) {

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: "pas le droit mec"
        });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'shhhhh....');
    if (!payload.sub) {
        res.status(401).send({
            message: "Fail authent"
        });
    }

    res.json(jobs);
})

mongoose.connect('mongodb://localhost/jwtTuto');


//test du jwt 
//console.log(jwt.encode('hi', 'secret')); 

var server = app.listen(3000, function () {
    console.log('api listening on', server.address().port);
})