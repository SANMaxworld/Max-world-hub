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

// 🔍 Robust Page Detection
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

    if (isSeriesPage) {
        filtered = items.filter(item => item.category === 'SERIES');
    } else if (isMoviePage) {
        filtered = items.filter(item => item.category === 'MOVIES');
    } else if (isAppPage) {
        filtered = items.filter(item => item.category === 'APPS');
    } else if (isGamePage) {
        filtered = items.filter(item => item.category === 'GAMES');
    } else if (isIndexPage && query === "" && !isInitialLoad) {
        resultContainer.innerHTML = '';
        return;
    }

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

// 🍿 3. Modal Logic (Updated with Tutorial Button & VPN)
function openAdvancedModal(id) {
    const item = mwHubData.find(i => i.id === id);
    if (!item) return;

    const modal = document.getElementById('seriesModal');
    if (!modal) return;

    history.pushState({ modalOpen: true }, "");

    modal.className = 'modal-overlay';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // 🚀 Turbo VPN Section
    const vpnSection = `
        <div style="border-top: 1px solid #800080; border-bottom: 1px solid #800080; padding: 15px 0; margin: 20px 0; text-align: center;">
            <p style="color: #ff0000; font-size: 0.85rem; font-weight: bold; margin-bottom: 10px; padding: 0 10px;">
                ⚠️ WARNING: Agar download page slow load ho raha hai, toh Turbo VPN (USA Server) use karein. Isse page fast khulega!
            </p>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
                <a href="https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.turbovpn" target="_blank" 
                   style="display: inline-block; background: #39ff14; color: #000; padding: 8px 15px; border-radius: 5px; font-weight: bold; text-decoration: none; font-size: 0.75rem; box-shadow: 0 0 10px #39ff14;">
                   📱 MOBILE VPN
                </a>
                <a href="https://chromewebstore.google.com/detail/turbo-vpn-secure-free-vpn/bnlofglpdlboacepdieejiecfbfpmhlb?hl=en-GB" target="_blank" 
                   style="display: inline-block; background: #00e5ff; color: #000; padding: 8px 15px; border-radius: 5px; font-weight: bold; text-decoration: none; font-size: 0.75rem; box-shadow: 0 0 10px #00e5ff;">
                   💻 PC EXTENSION
                </a>
            </div>
        </div>
    `;

    // 🎬 Tutorial Section (Directly from your Telegram)
    const tutorialSection = `
        <div style="background: rgba(0, 229, 255, 0.1); border: 1px dashed #00E5FF; padding: 12px; border-radius: 8px; margin: 15px 0; text-align: center;">
            <p style="color: #fff; font-size: 0.8rem; margin-bottom: 8px;">
                💡 <b>Mobile aur PC</b> dono par download karne ka process same hai. Tutorial dekhein:
            </p>
            <a href="https://t.me/+lljXiSUu3FQ3Mjc9" target="_blank" 
               style="background-color: #00E5FF; color: #000; padding: 10px 18px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 0.85rem; box-shadow: 0 0 15px rgba(0,229,255,0.4);">
                🎬 HOW TO DOWNLOAD (MOBILE & PC) 🅥
            </a>
        </div>
    `;

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

            ${vpnSection}
            
            ${tutorialSection}

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

function closeModal() {
    const modal = document.getElementById('seriesModal');
    if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (history.state && history.state.modalOpen) {
            history.back();
        }
    }
}

window.addEventListener('popstate', function(event) {
    const modal = document.getElementById('seriesModal');
    if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    if (typeof mwHubData !== 'undefined') {
        displayItems(mwHubData, true);
    }
});

if (searchInput) {
    searchInput.addEventListener('input', () => displayItems(mwHubData));
}
