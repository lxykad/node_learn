/**
 * Created by integrity on 2017/8/9.
 */
'use strict';
var mongose = require('mongoose');
var articleSchema = require('../schema/articleSchema');

module.exports = mongose.model('article', articleSchema);