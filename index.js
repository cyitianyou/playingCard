var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var poker = require('./Poker.js');
poker.init();
app.use('/card', express.static(__dirname + '/card'));
app.get('/', function(req, res) {
    res.send('<h1>Welcome Realtime Server</h1>');
});
//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;


io.on('connection', function(socket) {
    console.log('a user connected');

    //监听新用户加入
    socket.on('login', function(obj) {
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;

        //检查在线列表，如果不在里面就加入
        if (!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username;
            //在线人数+1
            onlineCount++;
        }

        //向所有客户端广播用户加入
        io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
        console.log(obj.username + '已上线');
    });

    //监听用户退出
    socket.on('disconnect', function() {
        //将退出的用户从在线列表中删除
        if (onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = { userid: socket.name, username: onlineUsers[socket.name] };

            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
            console.log(obj.username + '已下线');
        }
    });

    //监听用户准备完毕
    socket.on('ready', function(obj) {

    });

    //监听用户出牌
    socket.on('out', function(obj) {

    });

    //监听用户吃牌
    socket.on('eat', function(obj) {

    });

    //监听用户要牌
    socket.on('in', function(obj) {

    });

    //监听用户发布聊天内容
    socket.on('message', function(obj) {
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.username + '说：' + obj.content);
    });

});

server.listen(3000, function() {
    console.log('listening on *:3000');
});