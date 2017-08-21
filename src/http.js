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
  var user = { name: 'lxy', age: 22 }

  let sign = jwt.sign(user, 'aaa');
  // console.log('sign====', user);

  // console.log('filename====',__filename);//当前模块的绝对路径
  // console.log('dirname====',__dirname)//当前文件所在文件夹的绝对路径


  /**
   * process
   * argv,env,
   */
  console.log('arch=====', process.arch)

  res.json('0');
});

/**
 * date测试代码
 */
router.post('/date/test', (req, res, next) => {

  const nowTime = Date.now();
  var sendTiem = new Date(2017, 7, 15, 9, 40, 0);//2017-08-14T03:07:00.000Z

  console.log('nowTime======', nowTime) //1502680394660
  console.log('sendTiem=====', sendTiem.valueOf())

  var date = new Date(sendTiem);

  console.log('date=====', date) //2017-08-14T03:07:00.000Z

  res.json('date')
});

/**
 *js 测试代码
 */
router.get('/js/test', (req, res, next) => {

  var arr = [ 1, 2, 3, 4, 3, 2, 4 ];

  // 返回相加结果
  let result = arr.reduce((x, y) => {
    return x+y;
  });

  // 返回 偶数/元素为4 的数组
  let filter = arr.filter((x) => {
    // return x%2==0;
    return x==4;
  });

  /**
   * 数组去重
   * x 数组中的某个元素
   * index 索引
   * self 数组本身
   */
  let newArr = arr.filter((x, index, self) => {
    console.log('indexof====', self.indexOf(x));// 0 1 2 3 2 1 3
    self.indexOf(x);// 2 3 4 3 2 4

    return self.indexOf(x)===index;// [1 2 3 4 ]
  })


  res.json(newArr);
});

module.exports = router;
