/**
 * Created by integrity on 2017/8/3.
 * 生产环境配置文件
 */
'use strict';

var config = {
  env: 'production', //环境名称
  port: 3008,         //服务端口号
  mysql_config: {
    //mysql数据库配置
  },
  mongodb_config: {
    //mongodb数据库配置
  },
  redis_config: {
    //redis数据库配置
  },

};
module.exports = config;