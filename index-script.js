// --- CARD RENDER ENGINE ---
function createCardHTML(anime) {
    // Title clean up (Remove [Hindi] from text if badge is there)
    let displayTitle = anime.title.replace('[Hindi]', '').replace('[English]', '').trim();
    
    return `
    <a href="${anime.link}" class="search-item">
        <span class="badge-hindi">${anime.lang}</span>
        <img src="${anime.img}" class="icon-poster" loading="lazy">
        <div class="content-box">
            <h4>${displayTitle}</h4>
        </div>
    </a>`;
}

function renderAnimeHub() {
    // List of categories based on your HTML IDs
    const categories = ['trending', 'movies', 'fantasy', 'series', 'action', 'adventure', 'romance', 'scifi', 'horror', 'comedy', 'drama'];

    categories.forEach(cat => {
        const grid = document.getElementById(`${cat}-grid`);
        if (grid) {
            grid.innerHTML = ''; // Clear old content
            const items = animeLibrary.filter(anime => anime.category === cat);
            
            items.forEach(anime => {
                grid.innerHTML += createCardHTML(anime);
            });
        }
    });
}

// SEARCH LOGIC
const searchInput = document.getElementById('searchInput');
const searchResultsArea = document.getElementById('searchResultsArea');
const mainContentBody = document.getElementById('mainContentBody');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) {
        mainContentBody.style.display = "none";
        searchResultsArea.style.display = "grid"; 
        searchResultsArea.style.gridTemplateColumns = "repeat(auto-fill, minmax(110px, 1fr))";
        searchResultsArea.innerHTML = "";
        
        const filtered = animeLibrary.filter(anime => 
            anime.title.toLowerCase().includes(query)
        );

        filtered.forEach(anime => {
            searchResultsArea.innerHTML += createCardHTML(anime);
        });
    } else {
        mainContentBody.style.display = "block";
        searchResultsArea.style.display = "none";
    }
});

// Initial Load
document.addEventListener('DOMContentLoaded', renderAnimeHub);

