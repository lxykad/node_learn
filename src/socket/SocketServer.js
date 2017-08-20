//
var express = require('express');
var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('socket_server=========connection');

    socket.on('disconnect',()=>{
        console.log('socket_server=========dicconnect');
    });
});

http.listen(3000,()=>{
    console.log('socket_server=========port:',3000);
});
