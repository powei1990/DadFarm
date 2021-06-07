var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database');

var dht22Schema = new mongoose.Schema({
    'temperature_c': Number,
    'humidity': Number,
    'date': { type: Date }
});

const dht22 = mongoose.model('weathers', dht22Schema, 'weathers1');
module.exports = dht22;