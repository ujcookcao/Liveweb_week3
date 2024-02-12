const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    console.log(socket.id+'a user connected');
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
        console.log(msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('drawing', (data) => socket.broadcast.emit('draw', data));
    socket.on('Bcolor', (color) => socket.broadcast.emit("Bcolorchange", color));
});

//server.listen(80, () => "server started");
server.listen(3000, () => "server started");