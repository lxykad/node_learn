/**
 * Created by integrity on 2017/8/7.
 * 博客首页
 */
'use strict';
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = express();

// const Promise = require('bluebird');
// var mongoose = require('mongoose');
// var config = require('./config/config')

//返回给前端的统一格式
var responseData = require('./responseData');
var UserModel = require('../model/usermodle');
var userSchema = require('../schema/userschema');

/**
 * 注册
 */
router.post('/regist', (req, res, next) => {

  var { username, password } = req.body;

  var data = {
    username,
    password
  };

  //简单的验证
  if (username=='') {
    responseData.code = 1;
    responseData.message = '用户名不能为空';

    res.json(responseData);
    return;
  }

  //数据库验证
  UserModel.findOne({
    username: username
  }).then((userinfo) => {

    if (userinfo!==null) {//用户已存在
      responseData.code = 4;
      responseData.message = '用户已存在';
      res.json(responseData);
      return;
    }

    var token = getToken(data);

    //用户不存在
    var user = new UserModel({
      username: username,
      password: password,
      token: token
    });

    //保存用户信息到数据库--暂时不做加密处理
    return user.save();

  }).then((info) => {

    res.json(info);
  });

})

//生成token
function getToken(user) {
  let sign = jwt.sign(user, 'aaa');
  return sign;
}


/**
 * 登陆
 */
router.post('/login', (req, res, next) => {
  var { username, password } = req.body;

  var data = {
    username,
    password
  };

  UserModel.findOne({ username: username })
        .then((info) => {
          if (info==null) {
            responseData.code = 5;
            responseData.message = '尚未注册，请先注册再登陆';
            res.json(responseData);
            return;
          } else {
            if (info.password!==password) {
              responseData.code = 6;
              responseData.message = '用户名或密码不正确';
              res.json(responseData);
              return;
            }

            responseData.code = 0;
            responseData.message = 'success';
            return info.save();

          }
        }).then((data) => res.json(Object.assign(data.toObject(), responseData)));

});

/**
 * 数据库查询所有已注册用户
 */
router.get('/all/users', (req, res, next) => {

  /* //查询所有
   UserModel.find()
   .then((users) => {
   res.send(users)
   });*/

  var { page = 0, perPage = 2 } = req.query;

  /**
   * 分页处理
   * 第一页page == 0
   * limit(number)
   * skip(num):忽略前两条，从第三条开始取  num = （当前页）*limit
   */
  UserModel.count().then((count) => {
    //总条数
    console.log('count====', count);
    //计算总页数
    var totolPages = Math.ceil(count/perPage);
    //page的最大值
    page = Math.min(page, totolPages);

    UserModel.find().limit((Number)(perPage)).skip((Number)(page)*perPage).then((users) => {
      res.json(users);
    }).catch(next);

  });

});

/**
 *删除用户信息
 */
router.post('/user/del', (req, res, next) => {

  var { username } = req.body;
  UserModel.find({ username: username })
        .then(users => {

          return Promise.map(users, (item) => {

            // console.log('item',item);
            return UserModel.remove({ username: username }, (err, docs) => {
              console.log('docs===', docs)
              return docs;
            });

          });

        })
        .then(data => {
          console.log('data', data);
        });

  res.json('del');

})

/**
 *修改用户信息
 */
router.post('/user/update', (req, res, next) => {

  var { username, newname = '888' } = req.body;

  UserModel.find({ username: username })
        .then((users) => {
          console.log('lenght===', users.length)

          if (users.length==0) {
            responseData.code = 9
            responseData.message = '未查找到该用户'
            res.json(responseData);

          } else {

            return Promise.map(users, (item) => {

              var conditions = {
                username: username
              }

              return UserModel.update({ username: username }, { username: newname }).then((data) => {
                console.log('data====', data)
                return data;
              });

            });

          }

        }).then(data => res.json(data))
        .catch(next);

})

module.exports = router;





