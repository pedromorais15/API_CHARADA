// Capturando os elementos do HTML
const cardInner = document.getElementById('card-inner')
const campoPergunta = document.getElementById('pergunta')
const campoResposta = document.getElementById('resposta')
const btnNova = document.getElementById('btn-nova')

// EVENTOS QUE FAZ O CARD GIRAR 
cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('[transform:rotateY(180deg)]')
})

// Inicializa a primeira charada
buscarCharada()

async function buscarCharada() {
    try {
        // 1. Resetar o card para a posição inicial (Pergunta) antes de carregar a nova
        cardInner.classList.remove('[transform:rotateY(180deg)]')

        // 2. Usando a URL de produção correta
        const url = 'https://api-charadas-backend-01.vercel.app'
        const endPoint = '/charadas/aleatoria'

        campoPergunta.textContent = 'Carregando...'

        const respostaAPI = await fetch(url + endPoint)
        
        if (!respostaAPI.ok) {
            throw new Error('Erro na requisição')
        }

        const dados = await respostaAPI.json()

        // 3. Inserindo os dados nos campos
        campoPergunta.textContent = dados.pergunta 
        campoResposta.textContent = dados.resposta

    } catch (erro) {
        campoPergunta.textContent = 'Erro ao conectar com o servidor'
        console.error('Erro ao buscar charada:', erro)
    }
}

btnNova.addEventListener('click', (e) => {
    e.stopPropagation() // Evita que o clique no botão dispare o giro do card
    buscarCharada()
})