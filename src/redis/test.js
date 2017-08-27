var redis = require('redis');

var client = redis.createClient(6379, 'localhost');

//储存字符串
client.set('name', 'lxy');
client.get('name', (err, value) => {
    console.log('name====', value);
});

//存储对象  实际存储为String 类型object
// client.set('user', {'name':'aaa','age':18});
client.get('user', (err, value) => {
    console.log('user====', value.toString());
});


//储存列表 list  每次执行都会添加
// client.rpush('list','a');//右侧插入  lpush 左侧插入到整个list的最前断
// client.rpush('list','b');
// client.rpush('list','c');
// client.rpush('list','5');

//出栈操作 可以左侧出栈或右侧出栈，执行一次出栈一个
// client.rpop('list',(err,data)=>{
//   console.log('pop======',data)// data=5  出栈的数据
// });

//列表取值
client.lrange('list', 0, -1, (err, data) => {
    console.log('list====', data)
});


//集合操作 sadd
client.sadd('set', 1);
client.sadd('set', 1);
client.sadd('set', 2);
client.sadd('set', 3);

//集合取值
client.smembers('set', (err, data) => {
    console.log('set=====', data)// 1,2,3  没有重复
});

//消息中介 发布和订阅
// client.subscribe('testPublish');//订阅testPublish频道

//先订阅再发布
client.publish('testPublish','msg publish');

//监听
client.on('message', (channel, message) => {
    console.log('channel====' + channel + "===msg====" + message);
});





