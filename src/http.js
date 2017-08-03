/**
 * Created by integrity on 2017/8/2.
 * 测试
 */
'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('./config/config')

router.get('/array', function (req, res, next) {

  var array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
  let keys = Object.keys(array);

  // array.length = 0;
  array.forEach((item) => {
    // console.log('item===='+item);
  })
  var port = process.env.PORT || 5000;
  console.log('port===='+config.port);
  


  res.json('0');
});


module.exports = router;