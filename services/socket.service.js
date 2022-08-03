var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('chat topic', topic => { // sets user's id as topic
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic
        })
        socket.on('chat updated', chat => {
            if(chat.sentToId === socket.myTopic  || chat.sentFromId === socket.myTopic){
                socket.broadcast.emit('message received', chat)
            }
        })
    })
}

module.exports = {
    connectSockets,
}