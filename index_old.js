const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var exec = require('child_process').exec;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
})
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('user', function(data) {
        console.log(socket.id + " : " + data.text);
    })

    socket.on('ledon', function() {
        ledon(socket);
        console.log("socket on ledon");
    })

    socket.on('streamOn', function() {
        streamOn(socket);
        console.log("socket on streamOn")
    })

    socket.on('streamOff', function() {
        streamOff(socket);
        console.log("socket on streamOff")
    })


});


function ledon(socket) {
    var cmd = 'python ~/DadFarm/controlgpio.py -p 11 -o 1';
    exec(cmd, function(error, stdout, stderr) {
        if (error != null) {
            console.log("出錯了！" + error);
            throw error;
        } else {
            console.log(stdout);
        }
    });
}

function ledoff(socket) {
    var cmd = 'python ~/DadFarm/controlgpio.py -p 11 -o 0';
    exec(cmd, function(error, stdout, stderr) {
        if (error != null) {
            console.log("出錯了！" + error);
            throw error;
        } else {
            console.log(stdout);
        }
    });
}

function streamOn(socket) {
    var cmd = 'cd mjpg-streamer/mjpg-streamer-experimental/ ';
    exec(cmd, function(error, stdout, stderr) {
        if (error != null) {
            console.log("出錯了！" + error);
            throw error;
        } else {
            console.log(stdout);
        }
    });
}

function streamOff(socket) {
    var cmd = 'kill $(pgrep mjpg)';
    exec(cmd, function(error, stdout, stderr) {
        if (error != null) {
            console.log("出錯了！" + error);
            throw error;
        } else {
            console.log(stdout);
        }
    });
}

server.listen(3000);
console.log("server.listen(3000)");