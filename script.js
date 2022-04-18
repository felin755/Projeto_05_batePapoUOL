
let mensagens = []

pegarMsg()

let nomeUsuario = prompt("Qual o seu nome?")
const usuario = {
    name: nomeUsuario
}
let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",usuario)
promise.then()
promise.catch(logarNovamente)

setInterval(pegarMsg,1000)
setInterval(manterLogado,5000)

let enter = document.querySelector(".digite") 
enter.addEventListener("keyup", function (event) {
    if (event.keycode == 13) {
        envioMsg()
    }
})


function logarNovamente() {
    window.location.reload()
}

function manterLogado() {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",usuario)
    promise.then()
}

function envioMsg() {
    let msg = {
        from: nomeUsuario,
        to:"Todos",
        text: document.querySelector(".digite").value,
        type: "message"
    }
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msg)
    promessa.then(pegarMsg)
    promessa.catch(logarNovamente)
    console.log("pegou msg")
}

function pegarMsg () {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promessa.then(carregarMsg)
}

function carregarMsg(response) {
    mensagens = response.data
    renderizarMsg()
}

function renderizarMsg () {
    const ulMsg = document.querySelector(".mensagens")
    ulMsg.innerHTML = ""
    for (let i=0; i<mensagens.length;i++) {
        if (mensagens[i].type==="message") {
            ulMsg.innerHTML += `
        <li class="message-background">
        <div class="message">
        <b class="b">(${mensagens[i].time})</b> <strong class="strong">${mensagens[i].from}</strong> <b class="b">para</b> <strong class="strong">${mensagens[i].to}</strong>: ${mensagens[i].text}
        </div>
        </li>`
        }
        else if (mensagens[i].type==="status") {
            ulMsg.innerHTML += `
        <li class="status-background">
        <div class="status">
        <b class="b">(${mensagens[i].time})</b> <strong class="strong">${mensagens[i].from}</strong> ${mensagens[i].text}
        </div>
        </li>`
        }
        
        
    }
    ulMsg.scrollIntoView(false)
}



