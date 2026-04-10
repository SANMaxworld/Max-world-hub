// 🎡 1. Swiper Slider Logic
if (document.querySelector('.mySwiper')) {
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        grabCursor: true,
    });
}

const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

// Page Detection
const isSeriesPage = window.location.pathname.includes('series.html');
const isMoviePage = window.location.pathname.includes('movies.html');
const isAppPage = window.location.pathname.includes('apps.html');
const isGamePage = window.location.pathname.includes('game.html');

// 🔍 2. Display Logic
function displayItems(items, isInitialLoad = false) {
    if (!resultContainer) return;
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    resultContainer.innerHTML = '';
    
    let filtered = items;

    // Category Filter based on Page
    if (isSeriesPage) filtered = items.filter(item => item.category === 'SERIES');
    else if (isMoviePage) filtered = items.filter(item => item.category === 'MOVIES');
    else if (isAppPage) filtered = items.filter(item => item.category === 'APPS');
    else if (isGamePage) filtered = items.filter(item => item.category === 'GAMES');

    // Search Filter
    if (query !== "") {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(query));
    }

    if (filtered.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; color:#ff0000; width:100%; padding:20px;">No Results Found</p>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = "search-item"; 
        
        // ⚡ Direct Click Event (No Hash)
        div.onclick = function() {
            openAdvancedModal(item.id);
        };

        const isAppOrGame = (item.category === 'APPS' || item.category === 'GAMES');
        const imgClass = isAppOrGame ? 'icon-square' : 'icon-poster';

        div.innerHTML = `
            <img src="${item.logo}" class="${imgClass}" alt="${item.name}">
            <div class="content-box">
                <h4>${item.name}</h4>
                <p class="desc-text">${item.desc}</p>
            </div>
        `;
        resultContainer.appendChild(div);
    });
}

// 🍿 3. Direct Pop-up Logic
function openAdvancedModal(id) {
    // Data check karein
    const item = mwHubData.find(i => i.id === id);
    if (!item) {
        console.error("Item not found!");
        return;
    }

    const modal = document.getElementById('seriesModal');
    if (!modal) return;

    modal.className = 'modal-overlay';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Scroll Lock

    modal.innerHTML = `
        <span class="close-btn" onclick="closeModal()">×</span>
        <div class="modal-content-full">
            <h2 style="color:#ff0000; font-size:1.5rem; margin-bottom:5px;">${item.name}</h2>
            
            <div style="margin-bottom:15px;">
                ${item.genres ? item.genres.map(g => `<span class="meta-tag">${g}</span>`).join('') : ''}
            </div>

            <img src="${item.logo}" style="width:100%; border-radius:15px; border: 1px solid #ff0000; margin-bottom:15px; box-shadow: 0 0 20px rgba(255,0,0,0.3);">

            <p style="font-size:0.85rem; color:#ccc; line-height:1.6; margin-bottom:20px;">${item.desc}</p>

            <table class="info-table">
                <tr><td class="td-label">Audio</td><td>${item.audio ? item.audio.join(', ') : 'Hindi'}</td></tr>
                <tr><td class="td-label">Quality</td><td>${item.quality || '1080p'}</td></tr>
                <tr><td class="td-label">Season</td><td>${item.season || 'N/A'}</td></tr>
            </table>

            <h3 style="margin: 25px 0 15px 0; font-size:1.1rem; border-left: 4px solid #ff0000; padding-left:10px;">Download Links</h3>
            
            <div class="ep-list">
                ${item.episodes.map(e => `
                    <div class="ep-row">
                        <span style="color:#fff; font-weight:600;">${e.ep}</span>
                        <a href="${e.link}" target="_blank" class="dl-btn">DOWNLOAD</a>
                    </div>
                `).join('')}
            </div>
            
            <p style="text-align:center; color:#444; font-size:0.7rem; margin-top:30px;">MW Hub - Premium Content</p>
        </div>
    `;
}

// ❌ Close Modal
function closeModal() {
    const modal = document.getElementById('seriesModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Scroll Unlock
    }
}

// 🚀 Start System
window.addEventListener('DOMContentLoaded', () => {
    if (typeof mwHubData !== 'undefined') {
        displayItems(mwHubData, true);
    } else {
        console.error("data.js load nahi hua hai!");
    }
});

// Search input listener
if (searchInput) {
    searchInput.addEventListener('input', () => {
        displayItems(mwHubData);
    });
}
