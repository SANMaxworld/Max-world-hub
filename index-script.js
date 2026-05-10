// --- 1. UTILITY FUNCTIONS (Purane functions jo HTML mein use ho rahe hain) ---

function toggleSearch(show) {
    const overlay = document.getElementById('searchOverlay');
    const results = document.getElementById('searchResultsArea');
    const content = document.getElementById('mainContentBody');
    const input = document.getElementById('searchInput');

    if (show) {
        overlay.classList.add('active');
        results.style.display = 'grid';
        content.style.opacity = '0.3';
    } else {
        overlay.classList.remove('active');
        results.style.display = 'none';
        content.style.opacity = '1';
        input.value = ''; // Search clear karne ke liye
    }
}

function toggleExplore() {
    const popup = document.getElementById('explorePopup');
    popup.classList.toggle('active');
}

// --- 2. THE ENGINE (JSON se Data Load karne wala part) ---

let fullLibrary = []; // Ismein hum saara data save rakhenge search ke liye

async function mwHubEngine() {
    try {
        // A. Slider Setup
        const sRes = await fetch('slider.json');
        const sData = await sRes.json();
        const hero = document.getElementById('heroWrapper');
        hero.innerHTML = ''; // Purana static data saaf karne ke liye
        sData.forEach(s => {
            hero.innerHTML += `<div class="swiper-slide"><a href="${s.link}"><img src="${s.img}" alt="${s.alt}"></a></div>`;
        });
        
        // Swiper Initialise
        new Swiper(".mySwiper", {
            pagination: { el: ".swiper-pagination", clickable: true },
            autoplay: { delay: 3500, disableOnInteraction: false },
            loop: true
        });

        // B. Trending Section
        const tRes = await fetch('trending.json');
        const tData = await tRes.json();
        const trendingGrid = document.getElementById('trending-grid');
        trendingGrid.innerHTML = ''; 
        tData.forEach(item => trendingGrid.innerHTML += createCard(item));

        // C. Main Library (Categories & Global Search)
        const lRes = await fetch('library.json');
        fullLibrary = await lRes.json(); // Data store kiya search ke liye
        
        fullLibrary.forEach(item => {
            const grid = document.getElementById(`${item.category}-grid`);
            if(grid) grid.innerHTML += createCard(item);
        });

    } catch (e) {
        console.error("Setup error bhai:", e);
    }
}

// Card ka standard design (Wahi jo pehle tha)
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

// --- 3. LIVE SEARCH LOGIC (JSON Library se connect) ---

document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const resultsArea = document.getElementById('searchResultsArea');
    
    if (term.length > 0) {
        // Library mein se filter karo
        const filtered = fullLibrary.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.category.toLowerCase().includes(term)
        );

        resultsArea.innerHTML = ''; // Purane results saaf
        if (filtered.length > 0) {
            filtered.forEach(item => resultsArea.innerHTML += createCard(item));
        } else {
            resultsArea.innerHTML = '<p style="color:white; padding:20px;">No results found... 🛑</p>';
        }
    }
});

// Website start karo
mwHubEngine();
    
