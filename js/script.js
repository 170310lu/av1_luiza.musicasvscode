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

function displayArtists(artists) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (artists.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">Nenhum artista encontrado.</p>';
        return;
    }
    artists.forEach(artist => {
        const isPittyOrSkankOrNatirutsOrRacionaisOrKidAbelha = artist.strArtist.toLowerCase().includes('pitty') || artist.strArtist.toLowerCase().includes('skank') || artist.strArtist.toLowerCase().includes('natiruts') || artist.strArtist.toLowerCase().includes('racionais') || artist.strArtist.toLowerCase().includes('kid abelha');
        const imgClass = isPittyOrSkankOrNatirutsOrRacionaisOrKidAbelha ? 'card-img-top adjust-image' : 'card-img-top';
        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${artist.strArtistThumb || 'images/placeholder.jpg'}" class="${imgClass}" alt="${artist.strArtist}">
                    <div class="card-body">
                        <h5 class="card-title">${artist.strArtist}</h5>
                        <p class="card-text">País: ${artist.strCountry || 'N/A'}</p>
                        <p class="card-text">Gênero: ${artist.strGenre || 'N/A'}</p>
                        <button class="btn btn-primary details-btn" data-id="${artist.idArtist || ''}" data-name="${artist.strArtist.replace(/"/g, '&quot;')}" data-genre="${(artist.strGenre || 'N/A').replace(/"/g, '&quot;')}">Ver detalhes</button>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += cardHTML;
    });
}

async function getArtistDetailsById(id) {
    const url = `https://www.theaudiodb.com/api/v1/json/2/artist.php?i=${encodeURIComponent(id)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição dos detalhes: ${response.status}`);
        }
        const data = await response.json();
        return data.artists ? data.artists[0] : null;
    } catch (error) {
        console.error('Erro ao obter detalhes do artista:', error);
        return null;
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
        'manevra': 'Deixa Rolar'
    };

    const albumInfo = {
        'o rappa': 'Lado B',
        'manevra': 'Manévra'
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

async function getArtistDetailsByName(name) {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(name)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição dos detalhes por nome: ${response.status}`);
        }

        const data = await response.json();
        return data.artists ? data.artists[0] : null;
    } catch (error) {
        console.error('Erro ao obter detalhes do artista por nome:', error);
        return null;
    }
}

async function showArtistDetails(idOrName) {
    const modalName = document.getElementById('modalName');
    const modalGenre = document.getElementById('modalGenre');
    const modalBio = document.getElementById('modalBio');
    const modalHit = document.getElementById('modalHit');
    const modalAlbum = document.getElementById('modalAlbum');

    modalName.textContent = 'Carregando detalhes...';
    modalGenre.textContent = '';
    modalBio.textContent = '';
    modalHit.textContent = '';
    modalAlbum.textContent = '';

    let artist = null;
    if (idOrName && /^[0-9]+$/.test(idOrName)) {
        artist = await getArtistDetailsById(idOrName);
    }

    if (!artist && idOrName) {
        artist = await getArtistDetailsByName(idOrName);
    }

    if (!artist) {
        modalName.textContent = 'Detalhes do artista indisponíveis.';
        const modal = new bootstrap.Modal(document.getElementById('artistModal'));
        modal.show();
        return;
    }

    const topTrack = await getTopTrackByArtist(artist.strArtist);

    const normalizedName = artist.strArtist ? artist.strArtist.trim().toLowerCase() : '';
    const albumInfo = {
        'o rappa': 'Lado B',
        'manevra': 'Manévra'
    };
    const album = albumInfo[normalizedName] || '';

    modalName.textContent = `Nome: ${artist.strArtist}`;
    modalGenre.textContent = `Gênero: ${artist.strGenre || 'N/A'}`;
    if (album) {
        modalAlbum.textContent = `Álbum: ${album}`;
    }
    modalBio.textContent = `História: ${artist.strBiographyEN || artist.strBiographyPT || 'História não disponível.'}`;
    modalHit.textContent = `Maior sucesso: ${topTrack}`;

    const modal = new bootstrap.Modal(document.getElementById('artistModal'));
    modal.show();
}

async function loadPopularArtists() {
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('d-none');
    const popularArtists = ['Pitty', 'Evanescence', 'Charlie Brown Jr.', 'Legião Urbana', 'Skank', 'O Rappa', 'Natiruts', 'Manevra', 'Kid Abelha', 'Racionais MC\'s'];
    const promises = popularArtists.map(artist => searchArtists(artist));

    try {
        const results = await Promise.all(promises);
        const allArtists = results.flat();
        displayArtists(allArtists);
    } catch (error) {
        console.error('Erro ao carregar artistas:', error);
        displayArtists([]);
    }

    loadingElement.classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
    loadPopularArtists();
    document.getElementById('results').addEventListener('click', (e) => {
        if (e.target.classList.contains('details-btn')) {
            const name = e.target.getAttribute('data-name');
            if (name) {
                window.location.href = `detalhes.html?artist=${encodeURIComponent(name)}`;
            }
        }
    });
});