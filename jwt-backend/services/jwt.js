var crypto = require('crypto');

exports.encode = function(payload, secret){
  algorithm = "HS256";
  var header = {type: "JWT", alg: algorithm};

  var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
  return jwt +  '.' + sign(jwt, secret);

};

exports.decode = function(token, secret){
  if (!token) {
    throw  new Error('Token structure is not correct');
  }

  var segments = token.split('.');
  if(segments.length !== 3) {
    throw  new Error('Token structure is not correct');
  }

  var header = JSON.parse(base64Dencode(segments[0]));
  var payload = JSON.parse(base64Dencode(segments[0]));

  var rawSignature = segments[0] + '.' + segments[0];


  if (!verify(rawSignature, secret,segments[2]))
      throw new Error('Verification failed');
  return payload;
};
function verify(raw, secret,  signature) {
  return signature === sign(raw, secrets);
}

function base64Encode(str) {
  return new Buffer(str).toString('base64');
}

function base64Dencode(str) {
  return new Buffer(str, 'base64').toString();
}



function sign(str, key) {
  return crypto.createHmac('sha256', key).update(str).digest('base64');
}
