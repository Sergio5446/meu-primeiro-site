// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector(".card-container");
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    let dados = []; // Armazena todos os dados do data.json

    /**
     * Renderiza os cards na tela.
     * @param {Array} dadosParaRenderizar - O array de objetos a ser renderizado.
     */
    function renderizarCards(dadosParaRenderizar) {
        cardContainer.innerHTML = ""; // Limpa os cards existentes

        if (dadosParaRenderizar.length === 0) {
            cardContainer.innerHTML = '<p class="no-results">Nenhum resultado encontrado.</p>';
            return;
        }

        dadosParaRenderizar.forEach(dado => {
            const article = document.createElement("article");
            article.classList.add("card"); // Adiciona a classe para estilização
            article.innerHTML = `
                <h2>${dado.nome}</h2>
                <p>${dado.descrição}</p>
                <p><strong>Ano de criação:</strong> ${dado.ano_criação}</p>
                <p><strong>Criador:</strong> ${dado.criador}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            `;
            cardContainer.appendChild(article);
        });
    }

    /**
     * Filtra os dados com base no termo de busca e renderiza os resultados.
     */
    function iniciarBusca() {
        const termoBusca = searchInput.value.toLowerCase();

        if (termoBusca.trim() === '') {
            cardContainer.innerHTML = ""; // Limpa a tela se a busca for vazia
            return;
        }

        const dadosFiltrados = dados.filter(dado => {
            const nome = dado.nome.toLowerCase();
            return nome === termoBusca; // Compara a igualdade exata
        });
        renderizarCards(dadosFiltrados);
        searchInput.value = ''; // Limpa o campo de busca
    }

    /**
     * Carrega os dados do arquivo JSON e inicializa a aplicação.
     */
    async function inicializar() {
        const resposta = await fetch("data.json");
        dados = await resposta.json(); // Apenas carrega os dados, não renderiza
    }

    // Adiciona o listener para o clique no botão de busca
    searchButton.addEventListener('click', iniciarBusca);

    // Adiciona o listener para a tecla "Enter" no campo de busca
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            iniciarBusca();
        }
    });

    // Inicia o carregamento dos dados
    inicializar();
});