// Configurações e Estado
const URL_API = 'https://api-charadas-backend-01.vercel.app';
let respostaCorreta = "";
let pontos = 0;

// Elementos de Navegação
const viewNormal = document.getElementById('view-normal');
const viewGame = document.getElementById('view-game');
const btnNavNormal = document.getElementById('nav-normal');
const btnNavGame = document.getElementById('nav-game');
const mainBody = document.getElementById('main-body');

// Elementos das Telas
const cardInner = document.getElementById('card-inner');
const campoPergunta = document.getElementById('pergunta');
const campoResposta = document.getElementById('resposta');
const perguntaGame = document.getElementById('pergunta-game');
const inputResposta = document.getElementById('input-resposta');
const placarElemento = document.getElementById('placar');

// 1. SISTEMA DE NAVEGAÇÃO (SPA)
btnNavNormal.addEventListener('click', () => {
    viewNormal.classList.remove('hidden');
    viewGame.classList.add('hidden');
    mainBody.style.backgroundColor = "#FFD100"; // Amarelo para Normal
    buscarCharada(false);
});

btnNavGame.addEventListener('click', () => {
    viewGame.classList.remove('hidden');
    viewNormal.classList.add('hidden');
    mainBody.style.backgroundColor = "#3B82F6"; // Azul para Game
    buscarCharada(true);
});

// 2. BUSCA DE DADOS NA API
async function buscarCharada(isGameMode) {
    try {
        const campoAlvo = isGameMode ? perguntaGame : campoPergunta;
        
        // Reset Visual
        cardInner.classList.remove('rotate-y-180');
        campoAlvo.textContent = 'Buscando...';
        if (inputResposta) inputResposta.value = "";

        const respostaAPI = await fetch(`${URL_API}/charadas/aleatoria`);
        if (!respostaAPI.ok) throw new Error('Erro na conexão');
        
        const dados = await respostaAPI.json();

        // Atribuição de dados
        campoAlvo.textContent = dados.pergunta;
        campoResposta.textContent = dados.resposta;
        respostaCorreta = dados.resposta;

    } catch (erro) {
        console.error('Falha ao carregar charada:', erro);
    }
}

// 3. LÓGICA DO JOGO
function verificarResposta() {
    const chute = inputResposta.value.trim().toLowerCase();
    const gabarito = respostaCorreta.toLowerCase();

    if (chute === "") return;

    // Validação flexível (se contém a palavra-chave)
    if (gabarito.includes(chute) || chute.includes(gabarito)) {
        pontos += 10;
        alert("EXATO! +10 PONTOS 🧠");
        buscarCharada(true); // Carrega a próxima automaticamente
    } else {
        pontos = Math.max(0, pontos - 2);
        alert("ERRADO! Tente de novo ou pule.");
    }
    placarElemento.textContent = pontos;
}

// 4. EVENTOS DE INTERAÇÃO
document.getElementById('btn-nova').addEventListener('click', () => buscarCharada(false));
document.getElementById('btn-chutar').addEventListener('click', verificarResposta);
document.getElementById('btn-pular').addEventListener('click', () => {
    pontos = Math.max(0, pontos - 5);
    placarElemento.textContent = pontos;
    buscarCharada(true);
});

// Giro do card apenas no modo normal
cardInner.addEventListener('click', () => {
    if (!viewNormal.classList.contains('hidden')) {
        cardInner.classList.toggle('rotate-y-180');
    }
});

// Atalho Tecla Enter
inputResposta.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verificarResposta();
});

// Inicialização
buscarCharada(false);