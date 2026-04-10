// 🎡 1. Swiper Slider Logic
if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
        loop: true, autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        grabCursor: true,
    });
}

const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

// 🔍 Robust Page Detection (Ab fail nahi hoga)
const path = window.location.pathname.toLowerCase();
const isSeriesPage = path.endsWith('series.html');
const isMoviePage = path.endsWith('movies.html');
const isAppPage = path.endsWith('apps.html');
const isGamePage = path.endsWith('game.html');
const isIndexPage = path.endsWith('index.html') || path.endsWith('/') || path === "";

// 📋 2. Display Logic
function displayItems(items, isInitialLoad = false) {
    if (!resultContainer) return;
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    resultContainer.innerHTML = '';
    
    let filtered = items;

    // Filter Logic based on filename
    if (isSeriesPage) {
        filtered = items.filter(item => item.category === 'SERIES');
    } else if (isMoviePage) {
        filtered = items.filter(item => item.category === 'MOVIES');
    } else if (isAppPage) {
        filtered = items.filter(item => item.category === 'APPS');
    } else if (isGamePage) {
        filtered = items.filter(item => item.category === 'GAMES');
    } else if (isIndexPage && query === "" && !isInitialLoad) {
        // Index page par jab tak search na ho, tab tak kuch mat dikhao (buttons ke niche)
        resultContainer.innerHTML = '';
        return;
    }

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
        div.onclick = () => openAdvancedModal(item.id);

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

// 🍿 3. Modal Logic (Updated with Back Button Fix)
function openAdvancedModal(id) {
    const item = mwHubData.find(i => i.id === id);
    if (!item) return;

    const modal = document.getElementById('seriesModal');
    if (!modal) return;

    // 🔙 Phone Back Button Fix: Push a dummy state to browser history
    history.pushState({ modalOpen: true }, "");

    modal.className = 'modal-overlay';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    modal.innerHTML = `
        <span class="close-btn" onclick="closeModal()">×</span>
        <div class="modal-content-full">
            <h2 style="color:#ff0000; font-size:1.5rem; margin-bottom:5px;">${item.name}</h2>
            <div style="margin-bottom:15px;">
                ${item.genres ? item.genres.map(g => `<span class="meta-tag">${g}</span>`).join('') : ''}
            </div>
            <img src="${item.logo}" style="width:100%; border-radius:15px; border: 1px solid #ff0000; margin-bottom:15px;">
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
                        <span style="color:#fff;">${e.ep}</span>
                        <a href="${e.link}" target="_blank" class="dl-btn">DOWNLOAD</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ❌ Close Modal Function (Updated to sync with history)
function closeModal() {
    const modal = document.getElementById('seriesModal');
    if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Agar modal manually band kiya (X button se), toh extra history entry hatao
        if (history.state && history.state.modalOpen) {
            history.back();
        }
    }
}

// 🔙 Global Back Button Listener (Mobile Back Button)
window.addEventListener('popstate', function(event) {
    const modal = document.getElementById('seriesModal');
    if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 🚀 Initialization
window.addEventListener('DOMContentLoaded', () => {
    if (typeof mwHubData !== 'undefined') {
        displayItems(mwHubData, true);
    }
});

if (searchInput) {
    searchInput.addEventListener('input', () => displayItems(mwHubData));
}
