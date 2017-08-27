var redis = require('redis');

var client = redis.createClient(6379, 'localhost');

//先订阅再发布
client.publish('testPublish','msg publish');