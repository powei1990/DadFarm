const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/www/index.html');
})
io.on('connection', (socket) => {
	console.log(socket.id);
	socket.on('user', function(data) {
		console.log(socket.id+" : "+data.text);
	})
});


server.listen(3000);