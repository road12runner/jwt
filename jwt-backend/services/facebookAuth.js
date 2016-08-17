/**
 * Created by dpanferov on 17/08/2016.
 */
var request = require('request');
var qs = require('querystring');
var createSendToken = require('./tokenUtil');
var config = require('./config');
var User = require('../models/User');

module.exports = function(req,res) {
  var accessTokenUrl ='https://graph.facebook.com/oauth/access_token';
  var graphApi = 'https://graph.facebook.com/me';

  var params = {
    client_id : req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.FACEBOOK_SECRET,
    code: req.body.code
  };


  request.get({url: accessTokenUrl, qs: params}, function(err, response, accessToken){

    accessToken = qs.parse(accessToken);
    request.get({url: graphApi, qs: accessToken, json: true}, function(err, response, profile){
      User.findOne({facebookId: profile.id}, function(err, user){
        if (user) {
          return createSendToken(user, res);
        }

        var newUser = new User();
        newUser.facebookId = profile.id;
        newUser.displayName = profile.name;
        newUser.save(function(err){
          return createSendToken(newUser, res);
        });

      })
    });

  });

};
