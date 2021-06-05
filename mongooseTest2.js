var mongoose = require('mongoose');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var exec = require('child_process').exec;

app.set('view engine', 'ejs');



mongoose.connect('mongodb://192.168.1.103:27017/database');

var dht22Schema = new mongoose.Schema({
    'temperature_c': Number,
    'humidity': Number,
    'date': { type: Date }
});

const dht22 = mongoose.model('weathers', dht22Schema);
/*
    // 定義自訂的show()方法
    dht22Schema.methods.show = function() {
            var msg = "溫度：" + this['temperature_c'] +
                "、濕度：" + this['humidity'] +
                "、時間：" + this['date'];

            console.log(msg); // 在控制台輸出溫、濕度和時間資料
        }
        

dht22.find({ "date": { $gte: new Date(2021, 5, 1) } }).limit(10)
    .exec(function(err, docs) {
        if (err || !docs) {　　
            console.log("找不到dht22的資料！");
        } else {
            console.log(docs);
        }
    });
*/
app.get('/', function(req, res) {
    dht22.find({ "date": { $gte: new Date(2021, 5, 1) } }).limit(10)
        .exec(function(err, docs) {
            if (err || !docs) {　　
                console.log("找不到dht22的資料！");
            } else {
                console.log(docs);
            }
            res.render('testchat2', { docs: docs });
        });


})


server.listen(3000);
console.log("server.listen(3000)");