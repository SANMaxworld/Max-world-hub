// 🎡 1. Swiper Slider (Original)
if (document.querySelector('.mySwiper')) {
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        grabCursor: true,
    });
}

// 🔍 2. Master Search & Result Logic
const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

const isSeriesPage = window.location.pathname.includes('series.html');
const isMoviePage = window.location.pathname.includes('movies.html');

function displayItems(items, isInitialLoad = false) {
    const query = searchInput.value.trim().toLowerCase();

    if (!isSeriesPage && !isMoviePage && query === "" && !isInitialLoad) {
        resultContainer.innerHTML = '';
        return;
    }

    resultContainer.innerHTML = '';
    
    let filtered = items;
    if (isSeriesPage) {
        filtered = items.filter(item => item.category === 'SERIES');
    } else if (isMoviePage) {
        filtered = items.filter(item => item.category === 'MOVIES');
    }

    if (query !== "") {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
    }

    if (filtered.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; color:#00ff00; padding:20px;">No results found.</p>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = "search-item"; 
        // Pura card click par modal khulega
        div.onclick = () => openAdvancedModal(item.id);

        div.innerHTML = `
            <img src="${item.logo}" class="icon-poster" alt="Poster">
            <div class="content-box">
                <h4>${item.name}</h4>
                <p class="desc-text">${item.desc}</p>
            </div>
        `;
        resultContainer.appendChild(div);
    });
}

// 🍿 3. Advanced Full-Screen Modal Logic (ToonFlix Style)
function openAdvancedModal(id) {
    const item = mwHubData.find(i => i.id === id);
    if (!item) return;

    // URL change for Deep Linking
    window.location.hash = item.id;

    let modal = document.getElementById('seriesModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'seriesModal';
        document.body.appendChild(modal);
    }

    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <span class="close-btn" onclick="closeModal()">×</span>
        <div class="modal-content-full">
            <h2 style="color:#00ff00; font-size:1.5rem; margin-bottom:5px;">${item.name}</h2>
            
            <div style="margin-bottom:15px;">
                ${item.genres.map(g => `<span class="meta-tag">${g}</span>`).join('')}
            </div>

            <img src="${item.logo}" style="width:100%; border-radius:15px; border: 1px solid #333; margin-bottom:15px; box-shadow: 0 0 20px rgba(0,255,0,0.2);">

            <p style="font-size:0.85rem; color:#ccc; line-height:1.6; margin-bottom:20px;">${item.desc}</p>

            <table class="info-table">
                <tr><td class="td-label">Season</td><td>${item.season || '01'}</td></tr>
                <tr><td class="td-label">Episodes</td><td>${item.totalEpisodes || item.episodes.length}</td></tr>
                <tr><td class="td-label">Audio</td><td>${item.audio ? item.audio.join(', ') : 'Hindi'}</td></tr>
                <tr><td class="td-label">Quality</td><td>${item.quality || '720p, 1080p'}</td></tr>
            </table>

            <div class="recommendation-box">
                <p style="font-size:0.8rem; color:#fff;">
                    💡 <b>Pro Tip:</b> Hindi audio default hai. Agar aap <b>English</b> ya <b>Japanese</b> audio track mein dekhna chahte hain, toh <b>PLAYit Player</b> download karein.
                </p>
                <a href="https://play.google.com/store/apps/details?id=com.video.master" target="_blank" class="playit-btn">DOWNLOAD PLAYit</a>
            </div>

            <h3 style="margin: 25px 0 15px 0; font-size:1.1rem; border-left: 4px solid #00ff00; padding-left:10px;">Download Links</h3>
            <div class="ep-list">
                ${item.episodes.map(e => `
                    <div class="ep-row">
                        <span style="color:#fff; font-size:0.9rem; font-weight:600;">${e.ep}</span>
                        <a href="${e.link}" target="_blank" class="dl-btn">DOWNLOAD</a>
                    </div>
                `).join('')}
            </div>
            
            <p style="text-align:center; color:#555; font-size:0.7rem; margin-top:30px;">MW Hub - Premium Content Delivery</p>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Lock Scroll
}

function closeModal() {
    const modal = document.getElementById('seriesModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Unlock Scroll
        // Remove hash from URL without reloading
        history.replaceState(null, null, window.location.pathname);
    }
}

// 🔗 4. Deep Linking & Back Button Logic
window.addEventListener('hashchange', () => {
    if (!window.location.hash) {
        closeModal();
    } else {
        const id = parseInt(window.location.hash.replace('#', ''));
        if (id) openAdvancedModal(id);
    }
});

// 🚀 5. Trigger Auto-Load & Deep Link Check
window.addEventListener('DOMContentLoaded', () => {
    if (isSeriesPage || isMoviePage) {
        displayItems(mwHubData, true); 
    }
    
    // Check if URL has a hash on load (e.g., mwhub.in/#1)
    if (window.location.hash) {
        const id = parseInt(window.location.hash.replace('#', ''));
        if (id) setTimeout(() => openAdvancedModal(id), 500);
    }
});

// Search Listener
if (searchInput) {
    searchInput.addEventListener('input', () => {
        displayItems(mwHubData);
    });
}

// Pop-up Close Logic (Original)
function closePopup() {
    const popup = document.getElementById('welcome-popup');
    if (popup) {
        popup.style.display = 'none';
        sessionStorage.setItem('popupShown', 'true');
    }
}
