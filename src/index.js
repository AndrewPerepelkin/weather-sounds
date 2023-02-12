import './index.scss'

// elements
const buttons = document.querySelectorAll('.btn')
const volume = document.querySelector('#volume')
const audios = document.querySelectorAll('audio')

// util functions
function playSound(btn) {
  const audio = document.querySelector(`#${btn.dataset.sound}`)
  audio.volume = volume.value / 100
  audio.currentTime = 0
  audio.play()
}
function stopSound(btn) {
  const audio = document.querySelector(`#${btn.dataset.sound}`)
  audio.pause()
  audio.currentTime = 0
}
function toggleBackground(btn) {
  const background = document.querySelector('.background')
  const imgUrl = `url(/assets/${btn.dataset.sound}-bg.jpg)`
  background.style.backgroundImage = imgUrl
}

// buttons event
buttons.forEach((elem) => elem.addEventListener('click', playSoundHandler))

function playSoundHandler(event) {
  const btn = event.currentTarget

  if (btn.classList.contains('btn-active')) {
    const audioElem = document.querySelector(`#${btn.dataset.sound}`)
    if (audioElem.paused) {
      audioElem.play()
      btn.firstElementChild.src = `/assets/icons/${btn.dataset.icon}.svg`
    } else if (audioElem.played) {
      btn.firstElementChild.src = '/assets/icons/pause.svg'
      audioElem.pause()
    }
  } else {
    buttons.forEach((elem) => {
      if (elem.classList.contains('btn-active')) {
        elem.classList.remove('btn-active')
        elem.firstElementChild.src = `/assets/icons/${elem.dataset.icon}.svg`
        stopSound(elem)
      }
    })
    btn.classList.add('btn-active')
    playSound(btn)
    toggleBackground(btn)
  }
}

// volume event
volume.addEventListener('input', volumeControlHandler)

function volumeControlHandler(event) {
  audios.forEach((elem) => {
    if (elem.played) {
      elem.volume = event.target.value / 100
    }
  })
}
