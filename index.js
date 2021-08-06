const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var dht22 = require('./models/dht22');
var exec = require('child_process').exec;

var Gpio = require('onoff').Gpio;
var LED = new Gpio(17, 'out'); 

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    
    dht22.find().skip(dht22.count() - 100)
        .exec(function(err, docs) {
            if (err || !docs) {
                console.log("找不到dht22的資料！");
            } else {
                console.log("Pass DB data success!! ");
                var isLedOn = LED.readSync();
                console.log(isLedOn);
            }
            res.render('index', { docs: docs ,isLedOn:isLedOn});
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


});


function ledon(socket) {
    LED.writeSync(1);
   console.log("function ledon");
}

function ledoff(socket) {
    LED.writeSync(0);
 console.log("function ledoff");
}


server.listen(3000);
console.log("server.listen(3000)");