const botaoOito= document.getElementById("botao-oito");
const visor= document.getElementById("visor");
const botaoLimpar= document.getElementById("botao-limpar");
const botaosete = document.getElementById ("botao-sete");
const botaoNove =document.getElementById("botao-nove");
const botaoum =document.getElementById("botao-um");
const botaodois =document.getElementById("botao-dois");
const botaotres =document.getElementById("botao-tres");
const botaoquatro =document.getElementById("botao-quatro");
const botaoCinco =document.getElementById("botao-cinco");
const  botaoseis =document.getElementById("botao-seis");
const botaozero =document.getElementById("botao-zero");
const botaoadicao =document.getElementById("botao-adicao");
const botaosubtracao =document.getElementById("botao-subtracao");
const botaomultiplicacao =document.getElementById("botao-multiplicacao");
const botaodivisao =document.getElementById("botao-divisao");
const botaoIgual =document.getElementById("botao-igual");
const botaovirgula =document.getElementById("botao-virgula");
let expressao =[];
let numeroAtual = "0";
function atualizarVisor() {
    visor.textContent =expressao.join("") + numeroAtual;
}
function escolherOperacao(sinal) {
    const ultimoSinal = expressao[expressao.length - 1];
    
    if (
        numeroAtual ==="" &&
        sinal === "-" &&
        (ultimoSinal === "/" || ultimoSinal === "*")
    ){
        numeroAtual = "-";
    }
    else if (numeroAtual === "") {
        expressao.pop();
        expressao.push(sinal);
    } else {
        expressao.push(numeroAtual);
        expressao.push(sinal);
        numeroAtual ="";
    }
    atualizarVisor();
}
function adicionarDigito(digito) {
    if (numeroAtual === "0") {
        numeroAtual = digito;
    } else {
        numeroAtual += digito;
    }
    atualizarVisor();
}
botaoOito.addEventListener("click"
    , function() {
adicionarDigito("8");
});
botaosete.addEventListener("click", function() {
    adicionarDigito("7");
});
    botaoNove.addEventListener("click", function() {
        adicionarDigito("9");
    });
botaoLimpar.addEventListener("click", function() {
     expressao = [];
     numeroAtual = "0";
     atualizarVisor();
});
botaoum.addEventListener("click", function() {
    adicionarDigito("1");
});
botaodois.addEventListener("click", function() {
    adicionarDigito("2");
});
botaotres.addEventListener("click", function() {
    adicionarDigito("3");
});
botaoquatro.addEventListener("click", function() {
    adicionarDigito("4");
});
botaoCinco.addEventListener("click", function() {
    adicionarDigito("5");
});
botaoseis.addEventListener("click", function(){
    adicionarDigito("6");
});
botaozero.addEventListener("click", function() {
    adicionarDigito("0");
});
botaovirgula.addEventListener("click", function() {
    if (!numeroAtual.includes(",")) {
        if (numeroAtual === "") {
            numeroAtual = "0,";
        } else {
            numeroAtual += ",";
        }
        atualizarVisor();
    }
});
botaoadicao.addEventListener("click", function() {
escolherOperacao("+");
});
botaodivisao.addEventListener("click", function() {
    escolherOperacao("/");
});
botaosubtracao.addEventListener("click",function() {
    escolherOperacao("-");
});
botaomultiplicacao.addEventListener("click", function() {
    escolherOperacao("*");
});
function calcularExpressao(partes) {
    while (partes.includes("*") || partes.includes("/")) {
        let indice = partes.indexOf("*");
        const indiceDivisao = partes.indexOf("/");

        if (indice === -1 || (indiceDivisao !== -1 && indiceDivisao < indice)) {
            indice = indiceDivisao;
        }
        const primeiro = Number(partes[indice -1].replace(",","."));
        const segundo = Number(partes[indice + 1].replace(",","."));
        let resultado;

        if (partes[indice] === "*") {
            resultado = primeiro * segundo;
    }else {
        if(segundo ===0) {
            return "erro";
        }
        resultado = primeiro / segundo;
    }
         partes.splice(indice -1, 3, String(resultado).replace(".",","));
    }
    while (partes.length >1) {
        const primeiro = Number(partes[0].replace(",","."));
        const segundo = Number(partes[2].replace(",","."));
        let resultado;

        if (partes[1] === "+") {
            resultado = primeiro + segundo;
        }else {
            resultado = primeiro - segundo;
        }
        partes.splice(0, 3, String(resultado).replace(".",","));
      }
      return partes[0];  
    } 


botaoIgual.addEventListener("click", function() {
    if (expressao.length === 0 || numeroAtual === "" || numeroAtual === "-") {
        return;
    }

    const partes = [...expressao, numeroAtual];
    const resultado = calcularExpressao(partes);

    expressao = [];
    numeroAtual = resultado;
    atualizarVisor();
});