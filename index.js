const { Socket } = require('socket.io');
const PORT = process.env.PORT || 3000;

const io = require('socket.io')(3000 , {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



const users ={};

io.on('connection' , Socket=>{
    Socket.on('new-user-joined', name =>{
        console.log("new user" ,name);
        users[Socket.id]= name;
        Socket.broadcast.emit('user-joined', name);
    });

    Socket.on('send', message =>{
        Socket.broadcast.emit('receive' , {message: message , name : users[Socket.id]})
    });
    Socket.on('disconnect', message =>{
        Socket.broadcast.emit('left' , users[Socket.id] );
        delete users[Socket.id];
    });
});

