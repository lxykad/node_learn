/**
 * Created by integrity on 2017/7/27.
 */
var express = require('express');
var sha = require('sha1');
var app = express();

//微信公共号接入测试
var config = {
  appID: 'wx52e971ef431fdfb2',
  appSecret: 'aV0QEhwy0kqlTqv03KHJo6oBDPPmAIAhh1CateqrnPa',
  token: 'lxykad007'
}

//wechat
var wechat = app.use((req, res, next) => {

  //var {}
  var token = config.token;

  var signature = req.query.signature;
  var nonce = req.query.nonce;
  var timestamp = req.query.timestamp;
  var echostr = req.query.echostr;

  var str = [ token, timestamp, nonce ].sort().join('');
  var sha1 = sha(str);

  if (sha1===signature) {
    //根据腾讯服务器post过来的消息 统一处理
    console.log("wechat=======success==="+req.body)
    res.send(echostr)
  } else {
    console.log("wechat=======normal")
    //res.send('wrong')
    next();
  }

});

module.exports = wechat;
