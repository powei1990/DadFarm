const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var dht22 = require('./models/dht22');
var exec = require('child_process').exec;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    dht22.find().skip(dht22.count() - 100)
        .exec(function(err, docs) {
            if (err || !docs) {　　
                console.log("找不到dht22的資料！");
            } else {
                console.log(docs);
            }
            res.render('index', { docs: docs });
        });


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

    socket.on('ledoff', function() {
        ledoff(socket);
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