var mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.1.103:27017/database');

var dht22Schema = new mongoose.Schema({
    'temperature_c': Number,
    'humidity': Number,
    'date': { type: Date }
});

const dht22 = mongoose.model('weathers', dht22Schema);

// 定義自訂的show()方法
dht22Schema.methods.show = function() {
        var msg = "溫度：" + this['temperature_c'] +
            "、濕度：" + this['humidity'] +
            "、時間：" + this['date'];

        console.log(msg); // 在控制台輸出溫、濕度和時間資料
    }
    /*

    dht22.find({})
        .select('-_id -時間')
        .and([{ 'temperature_c': { $gte: 32 } }, { 'humidity': { $gte: 60 } }])
        .exec(function(err, docs) {
            if (err || !docs) {　　
                console.log("找不到dht22的資料！");
            } else {
                console.log(docs);
            }
        });
    */
dht22.find({}).limit(10)
    .exec(function(err, docs) {
        if (err || !docs) {　　
            console.log("找不到dht22的資料！");
        } else {
            console.log(docs);
        }
    });