import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'
const PORT = 3000

const app = express()
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('home')
})
app.get('/*', (req, res) => {
  res.redirect('/')
})

const handleListen = () => {
  console.log(`서버가 http://localhost:${PORT} 에서 작동중`)
}

const httpServer = http.createServer(app)
const wsServer = SocketIO(httpServer)

wsServer.on('connection', (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event : ${event}`)
  })
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName)
    done()
    socket.to(roomName).emit('welcome')
  })
  socket.on('out_room', (roomName, done) => {
    socket.leave(roomName)
    done()
  })
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit('bye')
    })
  })

  socket.on('send_message')
})

httpServer.listen(3000, handleListen)
