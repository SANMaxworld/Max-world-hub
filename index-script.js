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

// SEARCH OVERLAY UI
function toggleSearch(isFocus) { 
    const overlay = document.getElementById('searchOverlay'); 
    if(isFocus) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
        document.getElementById('searchInput').blur();
    }
}

// --- CARD GENERATOR FUNCTION ---
function generateCardHTML(item) {
    return `
    <a href="${item.link}" class="search-item">
        <span class="badge-hindi">${item.lang}</span>
        <img src="${item.img}" class="icon-poster" loading="lazy">
        <div class="content-box">
            <h4>${item.title}</h4>
            <p class="desc-text">${item.desc}</p>
        </div>
    </a>`;
}

// --- INJECT DATA INTO SECTIONS ---
function loadSections() {
    const categories = ['trending', 'movies', 'fantasy', 'series', 'action', 'adventure', 'romance', 'scifi', 'horror', 'comedy', 'drama'];
    
    categories.forEach(cat => {
        const grid = document.getElementById(cat + '-grid');
        if (grid) {
            // Find items belonging to this category
            const categoryItems = animeData.filter(item => item.categories.includes(cat));
            
            // Generate and inject HTML
            let htmlContent = '';
            categoryItems.forEach(item => {
                htmlContent += generateCardHTML(item);
            });
            grid.innerHTML = htmlContent;
            
            // Hide section if empty
            if(categoryItems.length === 0) {
                grid.parentElement.style.display = "none";
            }
        }
    });
}

// --- SMART SEARCH FILTERING LOGIC ---
const searchInput = document.getElementById('searchInput');
const searchResultsArea = document.getElementById('searchResultsArea');
const mainContentBody = document.getElementById('mainContentBody');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) {
        mainContentBody.style.display = "none";
        searchResultsArea.style.display = "grid"; // Grid mode for search wrapper
        searchResultsArea.innerHTML = "";
        
        // Filter directly from JS Storage (animeData)
        const filtered = animeData.filter(item => item.title.toLowerCase().includes(query));
        
        if (filtered.length > 0) {
            let resultHTML = '';
            filtered.forEach(item => {
                resultHTML += generateCardHTML(item);
            });
            searchResultsArea.innerHTML = resultHTML;
        } else {
            searchResultsArea.innerHTML = "<p style='text-align:center; grid-column: 1/-1; padding: 20px;'>No results found.</p>";
        }
    } else {
        mainContentBody.style.display = "block";
        searchResultsArea.style.display = "none";
    }
});

// Run load on start
document.addEventListener('DOMContentLoaded', loadSections);
