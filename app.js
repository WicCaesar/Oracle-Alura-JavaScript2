/* Feito por WicCaesar. Divirta-se! :-)

let titulo = document.querySelector('h1');
titulo.innerHTML = "Número secreto"
let paragrafo = document.querySelector('p');
paragrafo.innerHTML = `Escolha um número entre 1 e ${numeroMaximo}.`*/

//* Troque o número abaixo para alterar a dificuldade.
let numeroMaximo = 100;

// Faz o sintetizador ler o nome do jogo em vez do texto estilizado.
let TTS = false;
responsiveVoice.setTextReplacements([{
	searchvalue: ".NÚM3R0 5ECRE7O",
	newvalue: "Número secreto"
}]);

function ativarTTS() {
	if (TTS == false) {
		TTS = true;
		document.getElementById("tts").innerHTML = "Parar de ler";
	} else {
		TTS = false;
		document.getElementById("tts").innerHTML = "Ler para mim";
	}
}

function exibirTextoNaTela(tag, texto) {
	let elemento = document.querySelector(tag);
	elemento.innerHTML = texto;
	// Lê o texto em voz alta. Requer o arquivo responsivevoice.js no HTML/head.
// <script src="https://code.responsivevoice.org/responsivevoice.js"></script>
	if (TTS == true)
		responsiveVoice.speak(texto, "Brazilian Portuguese Female", {pitch:0.60, rate:1.38});
		//speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
}

function mensagemInicial() {
	// Substitui as primeiras quatro linhas do código. Economiza muitas linhas.
	exibirTextoNaTela("h1", ".NÚM3R0 5ECRE7O");
	exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroMaximo}.`)
	console.log("Projeto desenvolvido por César Augusto do Nascimento, \
para a formação da Oracle Next Education + Alura - 2024.\n\
JavaScript: César Augusto do Nascimento. \
HTML e CSS base: Mônica Mazzochi Hillman.\n");
}
mensagemInicial();

let tentativas = 0;
let listaNumerosSecretos = [];

function gerarNumeroAleatorio() {
	let numeroSorteado = parseInt(Math.random() * numeroMaximo + 1);
	if (listaNumerosSecretos.includes(numeroSorteado)) {
		return (gerarNumeroAleatorio());
	} else {
		if (listaNumerosSecretos.length >= 4)
			listaNumerosSecretos.shift();
			// Remove o primeiro elemento da lista, o número mais antigo.
		// Isso evita que o mesmo número seja sorteado várias vezes seguidas.
	// Implementado apenas por ser parte do aprendizado. Não concordo com isso.
		listaNumerosSecretos.push(numeroSorteado); // Inclui na lista.
		//console.log(numeroSorteado); // Revela o número secreto no console.
		return (numeroSorteado);
	}
}
let numeroSecreto = gerarNumeroAleatorio();

function novoJogo() {
	limparCampo();
	mensagemInicial();
	numeroSecreto = gerarNumeroAleatorio();
	tentativas = 0;
	document.querySelector("input").removeAttribute("disabled");
	document.getElementById("chutar").removeAttribute("disabled");
	document.getElementById("reiniciar").setAttribute("disabled", true);
}

function acertou() {
	let pluralChute = tentativas > 1 ? "chutes" : "chute";
	exibirTextoNaTela("h1", `${numeroSecreto}! Você acertou!`);
	exibirTextoNaTela("p", `Precisou de ${tentativas} ${pluralChute}.`);
	document.querySelector("input").setAttribute("disabled", true);
	document.getElementById("chutar").setAttribute("disabled", true);
	document.getElementById("reiniciar").removeAttribute("disabled");
}

// document.querySelector("input") é a caixa de texto onde o jogador palpita.
// Aqui estou apenas criando uma variável para facilitar o uso abaixo, 
// na função verificarChute() e na captura de sinal da tecla Enter.
let input = document.querySelector("input");

function verificarChute() {
	let chute = parseInt(input.value);
	++tentativas;

	if (chute == numeroSecreto)
		acertou();
	else if (!chute || chute < 1 || chute > numeroMaximo) {
		exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroMaximo}.`);
	} else {
		if (chute > numeroSecreto) {
			exibirTextoNaTela("p", `Menor que ${chute}!`);
		} else {
			exibirTextoNaTela("p", `Maior que ${chute}!`);
		}
	}
	limparCampo();
}

// Faz a tecla Enter funcionar como um clique no botão Chutar.
input.addEventListener("keyup", function(event) {
	if (event.key == "Enter") {
		event.preventDefault(); // Impede o comportamento padrão do Enter (como quebrar linhas em uma caixa de texto)
		verificarChute();
	}
});

function limparCampo() {
	chute = document.querySelector("input");
	chute.value = "";
}
