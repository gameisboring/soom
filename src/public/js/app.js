const socket = io()

const byeBtn = document.querySelector('#byeBtn')
const welcomeBtn = document.querySelector('#welcomeBtn')
const sendBtn = document.querySelector('#sendBtn')

const welcome = document.querySelector('#welcome')
const room = document.querySelector('#room')

const welcomeForm = welcome.querySelector('form')
const roomForm = room.querySelector('form')

room.hidden = true
let roomName, message

function handleEnterRoomSubmit(event) {
  event.preventDefault()
  const input = welcomeForm.querySelector('input')
  roomName = input.value
  input.value = ''

  socket.emit('enter_room', input.value, showRoom)
}

function handleOutRoomSubmit(event) {
  event.preventDefault()

  socket.emit('out_room', roomName, hideRoom)
  roomName = ''
}

function showRoom() {
  welcome.hidden = true
  room.hidden = false
  const h3 = room.querySelector('h3')
  h3.innerText = roomName
}

function handleSendSubmit(event) {
  event.preventDefault()

  const input = roomForm.querySelector('input[type=text]')
  message = input.value
  socket.emit('send_message', message)
  console.log(message)
}

function hideRoom() {
  welcome.hidden = false
  room.hidden = true
  const h3 = room.querySelector('h3')
  h3.innerText = ''
}

welcomeBtn.addEventListener('click', handleEnterRoomSubmit)
byeBtn.addEventListener('click', handleOutRoomSubmit)
roomForm.addEventListener('submit', handleSendSubmit)

function addMessage(message) {
  const ul = room.querySelector('ul')
  const li = document.createElement('li')
  li.innerText = message
  ul.append(li)
}
/* socket.on("이벤트 이름", "콜백") */
socket.on('welcome', () => {
  addMessage('Someone Joined')
})

socket.on('bye', () => {
  addMessage('Someone Lefted')
})
