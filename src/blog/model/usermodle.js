/**
 * Created by integrity on 2017/8/7.
 */
'use strict';
var mongose = require('mongoose');
var userSchema = require('../schema/userschema');

module.exports = mongose.model('userInfo', userSchema);