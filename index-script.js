// --- 1. UTILITY FUNCTIONS ---
function toggleSearch(show) {
    const overlay = document.getElementById('searchOverlay');
    const results = document.getElementById('searchResultsArea');
    const content = document.getElementById('mainContentBody');
    const input = document.getElementById('searchInput');

    if (show) {
        overlay.classList.add('active');
        results.style.display = 'grid'; // Grid display for search
        content.style.opacity = '0.3';
    } else {
        overlay.classList.remove('active');
        results.style.display = 'none';
        content.style.opacity = '1';
        input.value = ''; // Input clear
        results.innerHTML = ''; // Result cards clear
    }
}

function toggleExplore() {
    // In future, you can add explore popup logic here
    alert("Exploring categories...");
}

// --- 2. ENGINE (No Fetch - Super Fast) ---
function mwHubEngine() {
    // A. Swiper Setup
    new Swiper(".mySwiper", {
        pagination: { el: ".swiper-pagination", clickable: true },
        autoplay: { delay: 3500, disableOnInteraction: false },
        loop: true
    });

    // B. Load Trending Data (From trending-data.js)
    const trendingGrid = document.getElementById('trending-grid');
    if (trendingGrid && typeof trendingData !== 'undefined') {
        trendingData.forEach(item => {
            trendingGrid.innerHTML += createCard(item);
        });
    }

    // C. Load Library Data (From library-data.js)
    if (typeof fullLibraryData !== 'undefined') {
        fullLibraryData.forEach(item => {
            const grid = document.getElementById(`${item.category}-grid`);
            if (grid) {
                grid.innerHTML += createCard(item);
            }
        });
    }
}

// Standard Card Design
function createCard(item) {
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

// --- 3. LIVE SEARCH LOGIC ---
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const resultsArea = document.getElementById('searchResultsArea');
    
    if (term.length > 0) {
        // Search filter logic
        const filtered = fullLibraryData.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.category.toLowerCase().includes(term)
        );

        resultsArea.innerHTML = ''; // Clear previous results
        if (filtered.length > 0) {
            filtered.forEach(item => resultsArea.innerHTML += createCard(item));
        } else {
            resultsArea.innerHTML = '<div class="no-result-text">No results found... 🛑</div>';
        }
    } else {
        resultsArea.innerHTML = ''; // Clear if input empty
    }
});

// Run Engine on Load
window.onload = mwHubEngine;
