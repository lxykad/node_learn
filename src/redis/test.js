var redis = require('redis');

var client = redis.createClient(6379, 'localhost');

client.set('name', 'lxy');
client.get('name', (err, value) => {
  console.log('name====', value);
});

client.set('user', {'name':'aaa','age':18});
client.get('user', (err, value) => {
  console.log('user====', value);
});