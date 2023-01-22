let coderro=0;
let user="";
cadastrouser();
setInterval(buscarmsg,3000);
setInterval(manterconexao, 5000);


function cadastrouser(){
    user = prompt('Escreva seu nome:');
    const dados = {name: user};
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dados);
    requisicao.then(processar);
    requisicao.catch(erro);
}
function processar(resposta){
    console.log(resposta);
    setInterval(buscarmsg,1000);
}
function erro(resposta){
    coderro = resposta.response.status;
    console.log(coderro);
    alert(`Erro número ${coderro}`)
    cadastrouser();
}
function manterconexao(){
    const dados = {name: user};
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', dados);
    console.log('oi')
}
function buscarmsg(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(carregamsg);
}
function carregamsg(msgs){
    console.log(msgs.data)
    let data = msgs.data
    const elemento = document.querySelector('.conteudo');
    
    for (let i = 0; i < data.length; i++){
        if (data[i].type == "status"){
            elemento.innerHTML = elemento.innerHTML + 
            `<div class="conversa status"> 
            <span class="tempo">(${data[i].time})</span>
            <span class="bold">${data[i].from}</span> 
            <span>para</span> 
            <span class="bold"> ${data[i].to}:</span> 
            ${data[i].text} </div>`;
        } else if (data[i].type == "message"){
            elemento.innerHTML = elemento.innerHTML + 
            `<div class="conversa msg"> 
            <span class="tempo">(${data[i].time})</span>
            <span class="bold">${data[i].from}</span> 
            <span>para</span> 
            <span class="bold"> ${data[i].to}:</span> 
            ${data[i].text} </div>`;
            } else if (data.type == "private_message"){
                if (user == data[i].from || user == data[i].to){
                elemento.innerHTML = elemento.innerHTML + 
                `<div class="conversa privado"> 
                <span class="tempo">(${data[i].time})</span>
                <span class="bold">${data[i].from}</span> 
                <span>para</span> 
                <span class="bold"> ${data[i].to}:</span> 
                ${data[i].text} </div>`;
                }
            }
    }
    let ultimo = document.querySelectorAll(".conversa");
    console.log(ultimo.length)
    ultimo[ultimo.length-1].scrollIntoView();
}
function enviarmsg(){
    let elemento = document.querySelector('.valor')
    const dados = {from: user, to: "Todos" , text: elemento.value, type:"message"};
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', dados);
    setInterval(buscarmsg,1000);
    elemento.value = "";
}