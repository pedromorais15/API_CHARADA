// Capturando os elementos do HTML
const cardInner = document.getElementById('card-inner')
const campoPergunta = document.getElementById('pergunta')
const campoResposta = document.getElementById('resposta')
const btnNova = document.getElementById('btn-nova')

// EVENTOS QUE FAZ O CARD GIRAR 
cardInner.addEventListener('click', () => {
    // Corrigido: Removido o espaço interno da classe arbitrária
    cardInner.classList.toggle('[transform:rotateY(180deg)]')
})

// Adicionado evento ao botão para buscar nova charada

buscarCharada()

// FUNÇAO QUE IRA BUSCAR AS CHARADAS BACKEND
async function buscarCharada() {
    try {
        // Implementado o fetch para uma API de charadas
        const url = 'https://api-charadas-backend-01-ezm1sx3mj-pedro-mrs15s-projects.vercel.app'
        const endPoint = '/charadas/aleatoria'

        const respostaAPI = await fetch(url+endPoint)
        console.log(respostaAPI)

        const dados = await respostaAPI.json()
        console.log(dados.pergunta)
        console.log(dados.resposta)

        campoPergunta.textContent = dados.pergunta 
        campoResposta.textContent = dados.resposta

    } catch (erro) {
        campoPergunta.textContent = 'Erro ao conectar com o servidor backend'
        console.error('Erro ao buscar charada:', erro);
    }
}

btnNova.addEventListener('click', () => {
    buscarCharada()
})
