import './index.scss'

// elements
const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn')
const volume: HTMLInputElement = document.querySelector('#volume')
const audios: NodeListOf<HTMLAudioElement> = document.querySelectorAll('audio')

// util functions
function playSound(btn: HTMLElement): void {
  const audio: HTMLAudioElement = document.querySelector(
    `#${btn.dataset.sound}`,
  )
  audio.volume = +volume.value / 100
  audio.currentTime = 0
  audio.play()
}
function stopSound(btn: HTMLButtonElement): void {
  const audio: HTMLAudioElement = document.querySelector(
    `#${btn.dataset.sound}`,
  )
  audio.pause()
  audio.currentTime = 0
}
function toggleBackground(btn: HTMLButtonElement): void {
  const background: HTMLElement = document.querySelector('.background')
  const imgUrl = `url(/assets/${btn.dataset.sound}-bg.jpg)`
  background.style.backgroundImage = imgUrl
}

// buttons event
buttons.forEach((elem) => elem.addEventListener('click', playSoundHandler))

function playSoundHandler(event: MouseEvent): void {
  const btn = event.currentTarget as HTMLButtonElement

  if (btn.classList.contains('btn-active')) {
    const audioElem: HTMLAudioElement = document.querySelector(
      `#${btn.dataset.sound}`,
    )
    const iconImgElem = btn.firstElementChild as HTMLImageElement
    if (audioElem.paused) {
      audioElem.play()
      iconImgElem.src = `/assets/icons/${btn.dataset.icon}.svg`
    } else if (audioElem.played) {
      iconImgElem.src = '/assets/icons/pause.svg'
      audioElem.pause()
    }
  } else {
    buttons.forEach((elem: HTMLButtonElement) => {
      if (elem.classList.contains('btn-active')) {
        elem.classList.remove('btn-active')
        const iconImgElem = elem.firstElementChild as HTMLImageElement
        iconImgElem.src = `/assets/icons/${elem.dataset.icon}.svg`
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

function volumeControlHandler(event: InputEvent): void {
  const target = event.target as HTMLInputElement
  audios.forEach((elem: HTMLAudioElement) => {
    if (elem.played) {
      elem.volume = +target.value / 100
    }
  })
}
