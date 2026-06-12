async function searchArtists(query) {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        return data.artists || [];
    } catch (error) {
        console.error('Erro ao buscar artistas:', error);
        return [];
    }
}

async function getTopTrackByArtist(name) {
    const knownHits = {
        'pitty': 'Na Sua Estante',
        'skank': 'Vou Deixar',
        'charlie brown jr.': 'Dias de Luta, Dias de Glória',
        'legião urbana': 'Tempo Perdido',
        'evanescence': 'Bring Me to Life',
        'o rappa': 'Anjos (Pra Quem Tem Fé)',
        'natiruts': 'Quero Ser Feliz Também',
        'manevra': 'Deixa Rolar',
        'kid abelha': 'Lágrimas e Chuva',
        'racionais mc\'s': 'Diário de um Detento'
    };

    const normalizedName = name ? name.trim().toLowerCase() : '';
    const fallbackHit = knownHits[normalizedName] || 'Não disponível';
    const url = `https://www.theaudiodb.com/api/v1/json/2/track-top10.php?s=${encodeURIComponent(name)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição do maior sucesso: ${response.status}`);
        }

        const data = await response.json();
        if (data.track && data.track.length > 0 && data.track[0].strTrack) {
            return data.track[0].strTrack;
        }

        return fallbackHit;
    } catch (error) {
        console.error('Erro ao obter o maior sucesso:', error);
        return fallbackHit;
    }
}

async function displayArtistDetails(artist) {
    const detailsContainer = document.getElementById('details');
    const loadingElement = document.getElementById('loading');

    loadingElement.classList.add('d-none');

    if (!artist) {
        detailsContainer.innerHTML = '<p class="text-center">Artista não encontrado.</p>';
        return;
    }

    const topTrack = await getTopTrackByArtist(artist.strArtist);

    const albumInfo = {
        'o rappa': 'Lado B',
        'manevra': 'Manévra'
    };

    const normalizedName = artist.strArtist ? artist.strArtist.trim().toLowerCase() : '';
    const album = albumInfo[normalizedName] || '';

    const detailsHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${artist.strArtistThumb || 'images/placeholder.jpg'}" class="img-fluid rounded" alt="${artist.strArtist}">
            </div>
            <div class="col-md-6">
                <h2>${artist.strArtist}</h2>
                <p><strong>País:</strong> ${artist.strCountry || 'N/A'}</p>
                <p><strong>Gênero:</strong> ${artist.strGenre || 'N/A'}</p>
                ${album ? `<p><strong>Álbum:</strong> ${album}</p>` : ''}
                <p><strong>Maior sucesso:</strong> ${topTrack}</p>
                <hr>
                <h4>Sobre o artista:</h4>
                <p>${artist.strBiographyEN || artist.strBiographyPT || 'Informações não disponíveis.'}</p>
            </div>
        </div>
    `;

    detailsContainer.innerHTML = detailsHTML;
}

async function loadArtistFromURL() {
    const params = new URLSearchParams(window.location.search);
    const artistName = params.get('artist');

    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('d-none');

    if (!artistName) {
        document.getElementById('details').innerHTML = '<p class="text-center">Artista não especificado.</p>';
        loadingElement.classList.add('d-none');
        return;
    }

    const artists = await searchArtists(artistName);
    const artist = artists.length > 0 ? artists[0] : null;

    displayArtistDetails(artist);
}

document.addEventListener('DOMContentLoaded', () => {
    loadArtistFromURL();
});