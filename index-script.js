// --- SWIPER INIT ---
const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: { delay: 3000 },
    pagination: { el: '.swiper-pagination', clickable: true },
});

// --- RENDER ENGINE ---
function createCardHTML(anime) {
    return `
    <a href="${anime.link}" class="search-item">
        <span class="badge-hindi">${anime.lang || 'HINDI'}</span>
        <img src="${anime.img}" class="icon-poster" loading="lazy">
        <div class="content-box">
            <h4>${anime.title}</h4>
        </div>
    </a>`;
}

function renderAnimeHub() {
    // Categories matching your HTML IDs (-grid suffix)
    const categories = ['trending', 'movies', 'fantasy', 'series', 'action', 'adventure', 'romance', 'scifi', 'horror', 'comedy', 'drama'];

    categories.forEach(cat => {
        const grid = document.getElementById(`${cat}-grid`);
        if (grid) {
            grid.innerHTML = ''; 
            // Data filter from animeLibrary (Global)
            const items = animeLibrary.filter(anime => anime.category === cat);
            items.forEach(anime => {
                grid.innerHTML += createCardHTML(anime);
            });
        }
    });
}

// --- SEARCH SYSTEM ---
const searchInput = document.getElementById('searchInput');
const searchResultsArea = document.getElementById('searchResultsArea');
const mainContentBody = document.getElementById('mainContentBody');
const overlay = document.getElementById('searchOverlay');

function toggleSearch(show) {
    overlay.style.display = show ? 'block' : 'none';
}

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) {
        mainContentBody.style.display = "none";
        searchResultsArea.style.display = "grid"; 
        searchResultsArea.innerHTML = "";
        
        const filtered = animeLibrary.filter(anime => 
            anime.title.toLowerCase().includes(query)
        );

        if(filtered.length > 0) {
            filtered.forEach(anime => {
                searchResultsArea.innerHTML += createCardHTML(anime);
            });
        } else {
            searchResultsArea.innerHTML = "<p style='grid-column: 1/-1; text-align:center; padding:20px;'>No results found</p>";
        }
    } else {
        mainContentBody.style.display = "block";
        searchResultsArea.style.display = "none";
    }
});

// --- POPUPS ---
function toggleExplore() {
    const pop = document.getElementById('explorePopup');
    pop.style.display = (pop.style.display === 'flex') ? 'none' : 'flex';
}

// --- INITIAL LOAD ---
document.addEventListener('DOMContentLoaded', renderAnimeHub);
