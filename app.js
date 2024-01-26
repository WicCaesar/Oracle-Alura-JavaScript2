/* Feito por WicCaesar. Divirta-se! :-)

let titulo = document.querySelector('h1');
titulo.innerHTML = "Número secreto"

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = `Escolha um número entre 1 e ${numeroMaximo}.`*/

let numeroMaximo = 100;

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
	console.log("Projeto desenvolvido por César Augusto do Nascimento,\n\
para a formação da Oracle Next Education + Alura.\n\
JavaScript: César Augusto do Nascimento. HTML e CSS base: Mônica Mazzochi Hillman.\n");
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
			// remove o primeiro elemento da lista, o número mais antigo.
		listaNumerosSecretos.push(numeroSorteado);
		//console.log(numeroSorteado);
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

function verificarChute() {
	let chute = parseInt(document.querySelector("input").value);
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

function limparCampo() {
	chute = document.querySelector("input");
	chute.value = "";
}
