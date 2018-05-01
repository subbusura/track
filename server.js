var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

    // Routing
app.use(express.static(path.join(__dirname, 'public')));
io.on('connection',(socket)=>{
        socket.on('new device',(data)=>{

            console.log('new Device Connected'+data);
            
        });
        
        socket.on('device location',(data)=>{
            socket.broadcast.emit('location changed', data);
        });
});
 server.listen(port,ip);
 console.log('Server running on http://%s:%s', ip, port);