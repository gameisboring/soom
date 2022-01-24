const messageList = document.querySelector('ul')
const messageForm = document.querySelector('#message')
const nicknameForm = document.querySelector('#nickname')
const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => {
  console.log('Connected to Server ✅')
})

socket.addEventListener('message', (message) => {
  const li = document.createElement('li')
  li.innerText = message.data

  messageList.append(li)
})

socket.addEventListener('close', () => {
  console.log('Disconnected to Server ❌')
})

function handlesubmit(event) {
  event.preventDefault()
  const input = messageForm.querySelector('input')
  socket.send(makeMessage('message', input.value))
  input.value = ''
}
function handleNickSubmit(event) {
  event.preventDefault()
  const input = nicknameForm.querySelector('input')
  socket.send(makeMessage('nickname', input.value))
}

function makeMessage(type, payload) {
  const msg = { type, payload }
  return JSON.stringify(msg)
}
messageForm.addEventListener('submit', handlesubmit)
nicknameForm.addEventListener('submit', handleNickSubmit)
