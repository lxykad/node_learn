/**
 * Created by integrity on 2017/8/3.
 * 测试环境配置文件
 */
'use strict';

var config = {
  env: 'test', //环境名称
  port: 3002,         //服务端口号
  mysql_config: {
    //mysql数据库配置
  },
  mongodb_config: {
    //mongodb数据库配置
  },
  redis_config: {
    //redis缓存配置
  },

};
module.exports = config;