// script.js - Lógica para a página de listagem de artistas

/**
 * Função assíncrona para buscar artistas na API TheAudioDB
 * @param {string} query - Nome do artista a ser pesquisado
 * @returns {Array} - Array de artistas ou array vazio em caso de erro
 */
async function searchArtists(query) {
    // URL da API com o parâmetro de busca dinâmico
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(query)}`;

    try {
        // Faz a requisição usando Fetch API
        const response = await fetch(url);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Retorna os artistas ou um array vazio se não houver
        return data.artists || [];
    } catch (error) {
        // Log do erro no console
        console.error('Erro ao buscar artistas:', error);
        // Retorna array vazio em caso de erro
        return [];
    }
}

/**
 * Função para exibir os artistas no DOM
 * @param {Array} artists - Array de objetos de artistas
 */
function displayArtists(artists) {
    const resultsContainer = document.getElementById('results');

    // Limpa os resultados anteriores
    resultsContainer.innerHTML = '';

    // Verifica se não há artistas
    if (artists.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">Nenhum artista encontrado.</p>';
        return;
    }

    // Itera sobre cada artista e cria um card
    artists.forEach(artist => {
        const isPittyOrSkank = artist.strArtist.toLowerCase().includes('pitty') || artist.strArtist.toLowerCase().includes('skank');
        const imgClass = isPittyOrSkank ? 'card-img-top adjust-image' : 'card-img-top';
        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${artist.strArtistThumb || 'images/placeholder.jpg'}" class="${imgClass}" alt="${artist.strArtist}">
                    <div class="card-body">
                        <h5 class="card-title">${artist.strArtist}</h5>
                        <p class="card-text">País: ${artist.strCountry || 'N/A'}</p>
                        <p class="card-text">Gênero: ${artist.strGenre || 'N/A'}</p>
                        <button class="btn btn-primary details-btn" data-name="${artist.strArtist.replace(/"/g, '&quot;')}" data-genre="${(artist.strGenre || 'N/A').replace(/"/g, '&quot;')}">Ver detalhes</button>
                    </div>
                </div>
            </div>
        `;

        // Adiciona o card ao container
        resultsContainer.innerHTML += cardHTML;
    });
}

/**
 * Função para mostrar detalhes do artista no modal
 * @param {string} name - Nome do artista
 * @param {string} genre - Gênero musical
 */
function showArtistDetails(name, genre) {
    document.getElementById('modalName').textContent = `Nome: ${name}`;
    document.getElementById('modalGenre').textContent = `Gênero: ${genre}`;
    const modal = new bootstrap.Modal(document.getElementById('artistModal'));
    modal.show();
}

/**
 * Função para carregar artistas populares ao carregar a página
 */
async function loadPopularArtists() {
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('d-none');

    // Lista de artistas populares para carregar
    const popularArtists = ['Pitty', 'Evanescence', 'Charlie Brown Jr.', 'Legião Urbana', 'Skank'];

    // Faz requisições para cada artista
    const promises = popularArtists.map(artist => searchArtists(artist));

    try {
        const results = await Promise.all(promises);
        // Junta todos os resultados em um array único
        const allArtists = results.flat();
        displayArtists(allArtists);
    } catch (error) {
        console.error('Erro ao carregar artistas:', error);
        displayArtists([]);
    }

    loadingElement.classList.add('d-none');
}

// Carrega artistas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadPopularArtists();

    // Event listener para botões de detalhes
    document.getElementById('results').addEventListener('click', (e) => {
        if (e.target.classList.contains('details-btn')) {
            const name = e.target.getAttribute('data-name');
            const genre = e.target.getAttribute('data-genre');
            showArtistDetails(name, genre);
        }
    });
});