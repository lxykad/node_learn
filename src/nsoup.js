/**
 * Created by integrity on 2017/7/21.
 * 爬虫练习
 *
 * 学习使用 superagent 抓取网页
 * 学习使用 cheerio 分析网页
 *
 * 参考 https://github.com/alsotang/node-lessons/tree/master/lesson3
 */
var express = require('express');
var router = express.Router();

var superagent = require('superagent');
const cheerio = require('cheerio')


router.get('/soup', function (req, res, next) {

  superagent.get('https://cnodejs.org/')
        .end((err, result) => {
          if (err) {
            res.send(err);
          } else {

            var $ = cheerio.load(result.text);
            var items=[];

            $('#content .topic_title').each(function (idx, element) {
              var $element = $(element);
              items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
              });
            });

            res.json(items);
          }
        })
});

module.exports = router;