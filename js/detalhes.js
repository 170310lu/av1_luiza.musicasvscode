// detalhes.js - Lógica para a página de detalhes do artista

/**
 * Função assíncrona para obter detalhes do artista na API TheAudioDB
 * @param {string} id - ID do artista
 * @returns {Object|null} - Objeto do artista ou null em caso de erro
 */
async function getArtistDetails(id) {
    // URL da API com o ID do artista
    const url = `https://www.theaudiodb.com/api/v1/json/2/artist.php?i=${id}`;

    try {
        // Faz a requisição usando Fetch API
        const response = await fetch(url);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Retorna o primeiro artista ou null se não houver
        return data.artists ? data.artists[0] : null;
    } catch (error) {
        // Log do erro no console
        console.error('Erro ao obter detalhes do artista:', error);
        // Retorna null em caso de erro
        return null;
    }
}

/**
 * Função para exibir os detalhes do artista no DOM
 * @param {Object} artist - Objeto do artista
 */
function displayDetails(artist) {
    const detailsContainer = document.getElementById('details');

    // Verifica se o artista existe
    if (!artist) {
        detailsContainer.innerHTML = '<p class="text-center">Artista não encontrado.</p>';
        return;
    }

    // Cria o HTML dos detalhes usando template literals
    const detailsHTML = `
        <div class="card">
            <img src="${artist.strArtistBanner || artist.strArtistThumb || 'images/placeholder-banner.jpg'}" class="card-img-top" alt="${artist.strArtist}">
            <div class="card-body">
                <h5 class="card-title">${artist.strArtist}</h5>
                <p><strong>Gênero:</strong> ${artist.strGenre || 'N/A'}</p>
                <p><strong>País:</strong> ${artist.strCountry || 'N/A'}</p>
                <p><strong>Ano de Formação:</strong> ${artist.intFormedYear || 'N/A'}</p>
                <p><strong>Biografia:</strong> ${artist.strBiographyEN || artist.strBiographyPT || 'Biografia não disponível.'}</p>
                ${artist.strWebsite ? `<p><strong>Website:</strong> <a href="${artist.strWebsite}" target="_blank">${artist.strWebsite}</a></p>` : ''}
                ${artist.strFacebook ? `<p><strong>Facebook:</strong> <a href="https://www.facebook.com/${artist.strFacebook}" target="_blank">Facebook</a></p>` : ''}
                ${artist.strTwitter ? `<p><strong>Twitter:</strong> <a href="https://twitter.com/${artist.strTwitter}" target="_blank">Twitter</a></p>` : ''}
            </div>
        </div>
    `;

    // Adiciona os detalhes ao container
    detailsContainer.innerHTML = detailsHTML;
}

// Obtém os parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get('id');

// Verifica se o ID foi fornecido
if (artistId) {
    // Mostra o loading
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('d-none');

    // Obtém os detalhes do artista
    getArtistDetails(artistId).then(artist => {
        // Esconde o loading
        loadingElement.classList.add('d-none');

        // Exibe os detalhes
        displayDetails(artist);
    });
} else {
    // Exibe mensagem de erro se ID não fornecido
    document.getElementById('details').innerHTML = '<p class="text-center">ID do artista não fornecido.</p>';
}