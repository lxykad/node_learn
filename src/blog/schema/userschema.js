/**
 * Created by integrity on 2017/8/7.
 *
 */
'use strict';
var mongose = require('mongoose');

/**
 * 用户表结构
 */
module.exports = new mongose.Schema({

  username: String,
  password: String,
  token:String

});
