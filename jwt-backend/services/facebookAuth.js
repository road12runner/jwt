/**
 * Created by dpanferov on 17/08/2016.
 */


module.exports = function(req,res) {
  var accessTokenUrl ='https://graph.facebook.com/oauth/access_token';
  var graphApi = 'https://graph.facebook.com/me';

  var params = {
    client_id : req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.FACEBOOK_SECRET,
    code: req.body.code
  }
};
