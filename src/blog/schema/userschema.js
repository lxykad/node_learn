/**
 * Created by integrity on 2017/8/7.
 *
 */
'use strict';
var mongoose = require('mongoose');

/**
 * 用户表结构
 */
module.exports = new mongoose.Schema({

  username: String,
  password: String,
  token: String,

  //关联的字段
  bookId: {
    type: mongoose.Schema.ObjectId,
    ref: 'bookinfo'
  }

});
