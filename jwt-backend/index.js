//steam-way-139914

//345560570467-odmobbh2g7l39ajj2rbna3r5as4ruik4.apps.googleusercontent.com
//PWHip6PRUz8GdAd1dzKD9PUx

var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/User.js');
var mongoose = require('mongoose');
var request = require('request');

var moment = require('moment');

//var jwt = require('./services/jwt');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var facebookAuth = require('./services/facebookAuth');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user,done){
  done(null, user.id);
});
app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

var strategyOptions = {usernameField: 'email'};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done){

  var searchUser = {email: email};
  User.findOne(searchUser, function(err, user) {
    if (err)
      return done(err);

    if (!user)
      return done(null, false,{message: "Wrong email/password"});


    user.comparePasswords(password, function(err, isMatch){
      if (err)
        return done(err);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false,{message: "Wrong email/password"});
      }

    });
  });

});



var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done){


  var searchUser = {email: email};
  User.findOne(searchUser, function(err, user) {
    if (err)
      return done(err);

    if (user)
      return done(null, false, {message: "Email already exists"});

    var newUser = new User({
      email: email,
      password: password
    });

    newUser.save(function(err){
      done(null, newUser);
    });

  });


});


passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);


var jobs = ['Cook', 'SuperHero', 'Unicorn Wisperer', 'Inspector Gadget'];
app.get('/jobs', function(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send({message: 'You are not authorized'});
  }


  try {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) {
      console.log('no token');
      return res.status(401).send({message: 'Authentication failed'});
    }
    var payload = jwt.decode(token, 'shh..');
    if (!payload.sub)
      return res.status(401).send({message: 'Authentication failed'});

    res.json(jobs);

  } catch (err) {
    console.log(err);
    return res.status(401).send({message: 'Authentication failed'});
  }
});


//app.post('/login', function(req, res, next) {
//  passport.authenticate('local', function(err, user){
//    if(err) next(err);
//
//    req.login(user, function(err){
//      if(err) next(err);
//
//      createSendToken(user, res);
//    });
//  })(req, res, next);
//
//
//});

app.post('/login', passport.authenticate('local-login'), function(req, res) {
  createSendToken(req.user, res);
});

app.post('/register',  passport.authenticate('local-register'),function(req, res){
  createSendToken(req.user, res);
});

app.post('/auth/google', function(req, res, next) {
  var url = "https://accounts.google.com/o/oauth2/token";
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

  console.log('token', req.body.code);
  var params ={
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type: 'authorization_code',
    client_secret: 'PWHip6PRUz8GdAd1dzKD9PUx'
  };
  request.post(url, {json: true, form : params}, function(err, response, token){
    if (err) {
      console.log(err);
      return res.status(500);
    }
    var accessToken = token.access_token;
    var headers  = {
      Authorization: 'Bearer ' + accessToken
    };

    request.get({url : apiUrl, headers: headers, json : true}, function(err, response, profile){
      if (err) throw err;
      User.findOne({googleId: profile.sub}, function(err, foundUser){
        if (foundUser)
          return createSendToken(foundUser, res);

        var newUser = new User();
        newUser.googleId = profile.sub;
        newUser.displayName = profile.name;
        newUser.save(function(err){
          if (err) next(err);
          return createSendToken(newUser, res);
        });
      });
      return res.status(200);
    });


  });

});



app.post('/auth/facebook', facebookAuth);

function createSendToken(user, res) {

  var payload = {
    sub : user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, 'shh..');

  res.status(200).send({user: user.toJSON(), token: token});

}

mongoose.connect('mongodb://localhost/jwt');

var server = app.listen(3000, function(){
  console.log('api listining on', server.address().port);
});
