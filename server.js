const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server);

//позволяет принимать json данные
app.use(express.json())

//fake database
const rooms = new Map([
    
]);

app.get('/rooms/:id', (req, res) => {
    const {id: roomId} = req.params;
    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
    } : {users: [], messages: []}
    res.json(obj)
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
        socket.to(roomId).emit('ROOM:SET_USERS', users)
    })

    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
        const obj = {
            userName,
            text
        }
        
        rooms.get(roomId).get('messages').push(obj)
        socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj)
    })

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if(value.get('users').delete(socket.id)){
                const users = [...value.get('users').values()]
                //в опр-ю комнату отправить сокет запрос(broadcast - кроме меня)
                socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users)
            }
        })
    })

    
})

server.listen(9999, (err) =>{
    if(err){
        throw Error(err)
    }
    console.log('Server is running!')
})