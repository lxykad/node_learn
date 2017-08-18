/**
 * Created by integrity on 2017/8/9.
 */
'use strict';
var mongose = require('mongoose');

var bookSchema = new mongose.Schema({
  name: String,
  price: Number
});

module.exports = mongose.model('bookinfo', bookSchema);