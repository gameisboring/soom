const socket = io()
const byeBtn = document.querySelector('#byeBtn')
const welcomeBtn = document.querySelector('#welcomeBtn')
const form = welcome.querySelector('form')
const room = document.querySelector('#room')
function handleRoomSubmit(event) {
  event.preventDefault()
  const input = form.querySelector('input')

  socket.emit('enter_room', input.value, (msg) => {
    alert(`${msg}`)
  })
  input.value = ''
}

function handleOutRoomSubmit(event) {
  event.preventDefault()
  const input = form.querySelector('input')

  socket.emit('out_room', input.value, (msg) => {
    alert(`${msg}`)
  })
  input.value = ''
}

welcomeBtn.addEventListener('click', handleRoomSubmit)
byeBtn.addEventListener('click', handleOutRoomSubmit)
