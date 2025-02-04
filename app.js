// Variáveis globais
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Inicializa o jogo com a mensagem inicial
exibirMensagemInicial();

// Exibe texto na tela e utiliza síntese de voz
function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Usando SpeechSynthesis para falar o texto
    falarTexto(texto);
}

// Função para falar o texto usando SpeechSynthesis
function falarTexto(texto) {
    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = "pt-BR"; // Idioma: Português do Brasil
    mensagem.rate = 1.2; // Velocidade da fala
    speechSynthesis.speak(mensagem);
}

// Exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

// Verifica o número chutado pelo jogador
function verificarChute() {
    const chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "ACERTOU!");
        const palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

// Gera um número aleatório não repetido
function gerarNumeroAleatorio() {
    const numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;

    // Limpa a lista se todos os números já foram sorteados
    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Garante que o número não foi sorteado antes
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log("Número secreto:", numeroEscolhido); // Para depuração
        return numeroEscolhido;
    }
}

// Limpa o campo de entrada
function limparCampo() {
    const chute = document.querySelector("input");
    chute.value = "";
}

// Reinicia o jogo
function reiniciarJogo() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
