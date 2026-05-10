function toggleSearch(show) {
    const overlay = document.getElementById('searchOverlay');
    const results = document.getElementById('searchResultsArea');
    const content = document.getElementById('mainContentBody');
    const input = document.getElementById('searchInput');

    if (show) {
        overlay.style.display = 'block';
        results.style.display = 'grid';
        content.style.display = 'none'; 
        window.scrollTo(0, 0);
    } else {
        overlay.style.display = 'none';
        results.style.display = 'none';
        content.style.display = 'block'; 
        input.value = '';
        results.innerHTML = '';
    }
}

function mwHubEngine() {
    new Swiper(".mySwiper", {
        pagination: { el: ".swiper-pagination", clickable: true },
        autoplay: { delay: 3500, disableOnInteraction: false },
        loop: true
    });

    // Load Trending
    const tGrid = document.getElementById('trending-grid');
    if(typeof trendingData !== 'undefined') {
        trendingData.forEach(item => tGrid.innerHTML += createCard(item));
    }

    // Load Categories
    if(typeof fullLibraryData !== 'undefined') {
        fullLibraryData.forEach(item => {
            const grid = document.getElementById(`${item.category}-grid`);
            if(grid) grid.innerHTML += createCard(item);
        });
    }
}

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

document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const resultsArea = document.getElementById('searchResultsArea');
    
    if (term.length > 0) {
        const filtered = fullLibraryData.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.category.toLowerCase().includes(term)
        );
        resultsArea.innerHTML = ''; 
        if (filtered.length > 0) {
            filtered.forEach(item => resultsArea.innerHTML += createCard(item));
        } else {
            resultsArea.innerHTML = '<div style="grid-column: span 3; text-align:center; color:rgba(255,255,255,0.4); margin-top:50px;">No results found... 🛑</div>';
        }
    } else {
        resultsArea.innerHTML = '';
    }
});

function toggleExplore() {
    window.scrollTo({top: 400, behavior: 'smooth'});
}

window.onload = mwHubEngine;

