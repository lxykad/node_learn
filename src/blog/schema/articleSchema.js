/**
 * Created by integrity on 2017/8/9.
 */
'use strict';
var mongose = require('mongoose');

module.exports = new mongose.Schema({

  title: String,

  //关联字段 id
  articleId: {
    //类型
    type: mongose.Schema.Types.ObjectId,

    //引用 对应model 模型名称
    ref: 'bookinfo'
  },

  //简介
  description: {
    type: String,
    default: ''
  },

  //内容
  content: {
    type: String,
    default: ''
  }

});




