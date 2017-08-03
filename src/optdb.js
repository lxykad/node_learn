/**
 * Created by lxy on 2017/7/15.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var test = require('./test');
var request = require('superagent');
var WeChat = require('./wechat');

//连接本地数据库
var uri = 'mongodb://localhost/ApiServer';
var db = mongoose.connect(uri, {
  useMongoClient: true
});

/**
 *  增 如果是Entity，使用save方法，如果是Model，使用create方法
 *  改 修改也有两种方式
 *  查
 *  删
 *
 */

//schema 以文件形式存储的数据模型骨架，无法通往数据库端
var studentSchema = mongoose.Schema({
  name: String,
  age: Number
});

// model 参数1 为数据库中集合的名字
var studentModel = db.model("student", studentSchema);

//entity 由model创建，也可以操作数据库
var studentEntity = new studentModel({
  name: 'lxy',
  age: 22
});

//console.log('name========'+studentEntity.name);
// console.log('age========'+studentEntity.age)

router.get('/query/:id', function (req, res, next) {

  let query = req.params;

  // studentEntity.save((err, doc) => {
  //     if (err) {
  //         console.log('save===error==' + err)
  //     } else {
  //         console.log('save======success===' + doc)
  //     }
  // });
  // db.close();

  res.send(query);
});

router.get('/routetest', function fun1(req, res, next) {

        test.test();
        console.log('route====fun1');
        next('err');
        // res.send('fun1');
      },
      function fun2(req, res, next) {
        console.log('route====fun2')
        next();
        //res.send('fun2');
      },
      function fun3(req, res, next) {

        console.log('route====fun3')
        // next();
        res.end('fun3');
      }
);

router.get('/process', function fun1(req, res, next) {

        //let strings = process.argv;
        process.argv.forEach((val, index) => {
          console.log(`${index}: ${val}`);
        });


        res.json(process.argv.slice(2));
        //process.exit(1);
      }
);


router.get('/del', function (req, res, next) {

  // studentEntity.save((err, doc) => {
  //   if (err) {
  //     console.log('del===error=='+err)
  //   } else {
  //     console.log('del======success==='+doc)
  //   }
  // });
  // db.close();
  res.send('del');
});

router.get('/modify', function (req, res, next) {

  //第一种修改方式


  //第二种修改方式


  studentEntity.save((err, doc) => {
    if (err) {
      console.log('modify===error=='+err)
    } else {
      console.log('modify======success==='+doc)
    }
  });
  db.close();
  res.send('modify');
});

router.get('/q', function (req, res, next) {

  studentEntity.find('lxy', (err, result) => {
    if (err) {
      console.log('q===error=='+err)
    } else {
      console.log('q======success==='+result)
    }
  });

  db.close();
  res.send('q');
});

//模拟登陆
router.post('/login', function fun1(req, res, next) {

        let { username, pwd } = req.body;

        res.json({ username, pwd });
      }
);

//发送消息
router.get('/send/wx', function fun1(req, res, next) {

//获取token
        // 自己号
        //var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx576304ee4c15fdf3&secret=a950ccdd19f708a3671135b09ba81c5d';
        // cm 号
        //var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbbf2f0084de5f06b&secret=8ae497beef56422e94f6a18ddbeee508';
        //测试账号
        var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa682b40e836e5596&secret=73d18cabc87b71003a53bf03a229e914';

        request
              .get(url)
              .end((err, data) => {
                if (err) {
                  console.log('token=====err')
                  res.json(err)
                } else {
                  console.log('token=====success')
                  let parse = JSON.parse(data.text);

                  var { access_token, expires_in } = parse;
                 WeChat.sendAll(parse.access_token);
                 //  WeChat.getTags(parse.access_token);
                  res.send(parse.access_token);
                  // res.send(access_token);
                }
              })
      }
);

module.exports = router;