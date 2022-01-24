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
  socket.on('room', (a, b, c, d, e, done) => {
    console.log(a, b, c, d, e)
    setTimeout(() => {
      done()
    }, 1000)
  })
})
/* const sockets = []

const wss = new WebSocket.Server({ server })

wss.on('connection', (socket) => {
  sockets.push(socket)
  socket['nickname'] = 'Anonymous'
  console.log('Connected to Browser ✅')
  socket.on('message', (message) => {
    const { type, payload } = JSON.parse(message)
    switch (type) {
      case 'message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname} : ${payload}`)
        )
        break
      case 'nickname':
        socket['nickname'] = payload
        break
      default:
        console.log('wrong type')
    }
  })
  socket.on('close', () => {
    console.log('Disconnected from Browser ❌')
  })
}) */

httpServer.listen(3000, handleListen)
