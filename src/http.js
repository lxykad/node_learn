/**
 * Created by integrity on 2017/8/2.
 * 测试
 */
'use strict';
var express = require('express');
var jwt = require('jsonwebtoken');
const Promise = require('bluebird');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('./config/config')
var app = express();

router.get('/array', function (req, res, next) {

  var array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
  let keys = Object.keys(array);

  // array.length = 0;
  array.forEach((item) => {
    // console.log('item===='+item);
  })
  var port = process.env.PORT || 5000;

  let type = typeof array;
  // console.log('type====', type);
  // console.log('env===='+app.get('env'));

  // Promise.map(array, (item) => {
  //   console.log('item====', item);
  //   return item;
  // }).then((data)=>{
  //   console.log('data====', data);
  // });
  var user ={name: 'lxy', age: 22}

  let sign = jwt.sign(user, 'aaa');
  // console.log('sign====', user);

  // console.log('filename====',__filename);//当前模块的绝对路径
  // console.log('dirname====',__dirname)//当前文件所在文件夹的绝对路径


  /**
   * process
   * argv,env,
   */
  console.log('arch=====',process.arch)

  res.json('0');
});


module.exports = router;