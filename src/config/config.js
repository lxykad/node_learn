/**
 * Created by integrity on 2017/8/3.
 */
'use strict';

var development = require('./development');
var production = require('./production');
var test = require('./test');

function config() {

  switch (process.env.NODE_ENV) {
    case 'development':
      return development;
      break;
    case 'production':
      return production;
      break;
    case 'test':
      return test;
      break;
    default:
      return development;
  }

}

module.exports = config();