var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://192.168.1.103:27017/database';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");  
    var col = db.collection('weathers');
    col.find().limit(2).toArray(function(err, docs) {
    	docs.forEach(function (d) {
                console.log(d['temperature_c'] + " " + d['humidity'])
            })
      db.close();
    });
});