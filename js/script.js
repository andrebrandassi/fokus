const html = document.querySelector("html")
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const btns = document.querySelectorAll(".app__card-button")
const pausePlayBtn = document.querySelector(".app__card-primary-butto-icon")
const startPauseBtn = document.querySelector("#start-pause")
const musicaFocoInput = document.querySelector("#alternar-musica")
const iniciarOuPausarBtn = document.querySelector("#start-pause span")
const tempoNaTela = document.querySelector("#timer")
const playAudio = new Audio("/sons/play.wav")
const pauseAudio = new Audio("/sons/pause.mp3")
const beepAlarme = new Audio("/sons/beep.mp3")
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervalo = null

musicaFocoInput.addEventListener("change", () =>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

function alterarContexto(contexto){
    mostrarTemporizador()
    btns.forEach(function (contexto){
        contexto.classList.remove("active")
    })
    html.setAttribute("data-contexto",contexto)
    banner.setAttribute("src", `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Tome uma água e relaxe,<br>
                <strong class="app__title-strong">Hora de um descanso curto</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Volte para superfície,<br>
                <strong class="app__title-strong">Faça um descanso longo</strong>`
            break;
        default:
            break;
    }
}

function iniciarOuPausar(){
    if(intervalo){
        zerar()
        return
    }
    intervalo = setInterval(contagemRegressiva, 1000);
}

function zerar(){
    clearInterval(intervalo)
    iniciarOuPausarBtn.textContent = "Começar"
    pausePlayBtn.setAttribute("src", "/imagens/play_arrow.png")
    intervalo = null
}

function audioPlayOuPause(){
    if(intervalo){
        pauseAudio.play()
    }else{
        playAudio.play()
    }
}

function mostrarTemporizador(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

focoBtn.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto("foco")
    focoBtn.classList.add("active")
})

curtoBtn.addEventListener("click", ()=>{
    tempoDecorridoEmSegundos = 300
    alterarContexto("descanso-curto")
    curtoBtn.classList.add("active")
})

longoBtn.addEventListener("click", ()=>{
    tempoDecorridoEmSegundos = 900
    alterarContexto("descanso-longo")
    longoBtn.classList.add("active")
})

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos<=0){
        beepAlarme.play()
        alert('teeemmmmmmpoooooo seu MERDA `_´')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -=1
    mostrarTemporizador()
    console.log(tempoDecorridoEmSegundos)
    iniciarOuPausarBtn.textContent = "Pausar"
    pausePlayBtn.setAttribute("src", "/imagens/pause.png")

}

startPauseBtn.addEventListener("click", ()=>{
    iniciarOuPausar()
    audioPlayOuPause()
})

mostrarTemporizador()
