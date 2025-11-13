// Substitua pela sua chave REAL do OMDB API
const OMDB_API_KEY = 'coloque sua chave aqui';
const listaFilmesContainer = document.querySelector('.lista-filmes');
const searchInput = document.querySelector('.search-input');

// --- A. Função para Criar o HTML do Card ---
/**
 * Cria o elemento HTML de um Card de Filmes com os dados da OMDB.
 * @param {Ojbect} filme - Objeto de filme retornado pela API.
 */

function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add('card-filme');
    // Adiciona o IMDB ID como um data-attribute para buscar detalhes/trailer depois
    card.dataset.imdbId = filme.imdbID;

    // Garante que o rating seja um valor presente
    const rating = filme.imdbRating ? `(Star) ${filme.imdbRating}` : `(Star) N/A`;

    // Conteúdo HTML card, usando as novas classes CSS
    card.innerHTML = `
        <img src="${filme.poster !== 'N/A' ? filme.poster : 'placeholder.jpg'}"
            alt="${filme.title}"
            class="poster-filme">
        <span class="avaliacao">${rating}</span>
        <div class="card-detalhes">
            <h3 class="titulo-filme">${filme.title} (${filme.year})</h3>
            <buttton class="botao-adicionar" data-title="${filme.title}">
                + Minha Lista
            </button>
        </div>
    `;

    // Adiciona um listener para a funcionalidade de trailer (Se você tiver API)
    // Se você usar OMDB, precisará de uma segunda chamada para os detalhes
    card.addEventListener('click', () => buscarEExibirDetalhes(filme.imdbID));
    
    return card;
}

// --- B. Função Principal de Busca ---
/**
 * Busca o filme na OMDB e atualiza o container.
 * @param {string} termo - Termo de busca digitado pelo usuário.
 */

async function buscarFilmes(termo) {
    if (!termo) return; // Não busca se o estiver vazio

    // Limpa a lista anterior e mostra um indicador de carregamento
    listaFilmesContainer.innerHTML = '<p style="text-align: center; color: gray;">Carregando...</p>';
}