const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server);

//позволяет принимать json данные
app.use(express.json())

//fake database
const rooms = new Map([
    
]);

app.get('/rooms', (req, res) => {
    res.json(rooms)
})

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body
    if(!rooms.has(roomId)){
        rooms.set(
            roomId, 
            new Map([
                ['users', new Map()],
                ['messages', []],
            ])
        )
    }
    res.send()
})

io.on('connection', socket =>{
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        console.log(roomId)
        //подключаемся к сокету(в определенную комнату)
        socket.join(roomId)
        //сохраняем в фейк базу
        rooms.get(roomId).get('users').set(socket.id, userName)
        //получили список всех пользователей (имена)
        const users = [...rooms.get(roomId).get('users').values()]
        //в опр-ю комнату отправить сокет запрос(broadcast - кроме меня)
        socket.to(roomId).broadcast.emit('ROOM:JOINED', users)
    })
    console.log('user connected', socket.id)
})

server.listen(9999, (err) =>{
    if(err){
        throw Error(err)
    }
    console.log('Server is running!')
})