const socket = io()
const welcome = document.querySelector('#welcome')
const form = welcome.querySelector('form')

function handleRoomSubmit(event) {
  event.preventDefault()
  const input = form.querySelector('input')

  socket.emit('room', { payload: input.value }, 5, 'heloo', 41531, true, () => {
    console.log('server is done !')
  })
  input.value = ''
}

form.addEventListener('submit', handleRoomSubmit)
