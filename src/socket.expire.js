const sockets = []

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
})

module.exports = wss
