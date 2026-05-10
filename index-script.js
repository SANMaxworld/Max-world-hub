// Initialize Swiper Slider
var swiper = new Swiper(".mySwiper", { 
    pagination: { el: ".swiper-pagination", clickable: true }, 
    autoplay: { delay: 3000, disableOnInteraction: false }, 
    loop: true, 
    grabCursor: true 
});

// SIMPLE EXPLORE POPUP LOGIC
function toggleExplore() { 
    const pop = document.getElementById('explorePopup'); 
    if (pop.style.display === "flex") {
        pop.style.display = "none";
        pop.classList.remove('show');
    } else {
        pop.style.display = "flex";
        pop.classList.add('show');
    }
}

// SEARCH UI LOGIC
function toggleSearch(isFocus) { 
    const overlay = document.getElementById('searchOverlay'); 
    if(isFocus) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
        document.getElementById('searchInput').blur();
    }
}

// --- UPDATED CARD GENERATOR (Matches Image Layout) ---
function createCardHTML(anime) {
    return `
    <a href="${anime.link}" class="search-item">
        <span class="badge-hindi">${anime.lang}</span>
        <img src="${anime.img}" class="icon-poster" loading="lazy">
        <div class="content-box">
            <h4>${anime.title}</h4>
        </div>
    </a>`;
}

function renderAnimeHub() {
    const categories = ['trending', 'movies', 'fantasy', 'series', 'action', 'adventure', 'romance', 'scifi', 'horror', 'comedy', 'drama'];

    categories.forEach(cat => {
        const grid = document.getElementById(`${cat}-grid`);
        if (grid) {
            grid.innerHTML = '';
            const items = animeLibrary.filter(anime => anime.category === cat);
            items.forEach(anime => {
                grid.innerHTML += createCardHTML(anime);
            });
        }
    });
}

// Auto Load on Start
document.addEventListener('DOMContentLoaded', renderAnimeHub);

// DATA-DRIVEN SEARCH LOGIC
const searchInput = document.getElementById('searchInput');
const searchResultsArea = document.getElementById('searchResultsArea');
const mainContentBody = document.getElementById('mainContentBody');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    if (query.length > 0) {
        mainContentBody.style.display = "none";
        searchResultsArea.style.display = "grid"; 
        searchResultsArea.innerHTML = "";
        
        const uniqueTitles = new Set();
        const filtered = animeLibrary.filter(anime => {
            if(anime.title.toLowerCase().includes(query)) {
                if(!uniqueTitles.has(anime.title)) {
                    uniqueTitles.add(anime.title);
                    return true;
                }
            }
            return false;
        });

        if (filtered.length > 0) {
            filtered.forEach(anime => {
                searchResultsArea.innerHTML += createCardHTML(anime);
            });
        } else {
            searchResultsArea.innerHTML = "<p style='text-align:center; grid-column: 1/-1; padding: 20px; color:rgba(255,255,255,0.5);'>No results found.</p>";
        }
    } else {
        mainContentBody.style.display = "block";
        searchResultsArea.style.display = "none";
    }
});
