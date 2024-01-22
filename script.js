const html = document.querySelector('html')
const botaoFoco = document.querySelector('.app__card-button--foco')
const botaoCurto = document.querySelector('.app__card-button--curto')
const botaoLongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const tempoNaTela = document.querySelector('#timer')
const startPause = document.querySelector('#start-pause')
const startPauseText = document.querySelector('#start-pause span')
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon')
const toggleMusica = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
const stop = new Audio ('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

toggleMusica.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    botaoFoco.classList.add('active')

})

botaoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    botaoCurto.classList.add('active')
})

botaoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    botaoLongo.classList.add('active')
})

function alterarContexto (contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break
        case 'descanso-curto':
            titulo.innerHTML = `
            Quetal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar a superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `
        default:
            break;
    }
}

const temporizador = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar()
        stop.play()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        zerar()
        pause.play()
        return

    }
    play.play()
    intervaloId = setInterval(temporizador, 1000)
    startPauseIcon.setAttribute('src', `/imagens/pause.png`)
    startPauseText.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId)
    startPauseIcon.setAttribute('src', `/imagens/play_arrow.png`)
    startPauseText.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()