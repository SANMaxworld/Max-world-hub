// 🎡 1. Swiper Slider
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

function displayItems(items, isInitialLoad = false) {
    const query = searchInput.value.trim().toLowerCase();
    if (!isSeriesPage && query === "" && !isInitialLoad) {
        resultContainer.innerHTML = '';
        return;
    }

    resultContainer.innerHTML = '';
    let filtered = items;
    if (isSeriesPage) {
        filtered = items.filter(item => item.category === 'SERIES');
    }

    if (query !== "") {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
    }

    if (filtered.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; color:#ff0000; padding:20px;">No results found.</p>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = "search-item card-glow"; 
        
        // Dono ka layout SAME (Vertical & Big)
        div.style.cssText = "display: flex; flex-direction: column; background: #111; border-radius: 15px; overflow: hidden; margin-bottom: 25px; border: 1px solid #333; box-shadow: 0 5px 15px rgba(0,0,0,0.5); transition: 0.3s;";

        div.innerHTML = `
            <div style="width: 100%; height: 240px; position: relative;">
                <img src="${item.logo}" style="width: 100%; height: 100%; object-fit: cover;" alt="Poster">
                <span style="position: absolute; top: 12px; right: 12px; background: #ff0000; color: #fff; padding: 4px 10px; font-size: 11px; border-radius: 5px; font-weight: bold; text-transform: uppercase;">
                    ${item.category}
                </span>
            </div>

            <div style="padding: 18px; flex: 1; display: flex; flex-direction: column;">
                <h4 style="font-size: 1.25rem; color: #fff; margin-bottom: 10px; font-weight: bold;">
                    ${item.name}
                </h4>
                
                <p style="font-size: 0.85rem; color: #bbb; line-height: 1.5; margin-bottom: 15px; height: 3em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                    ${item.desc}
                </p>
                
                <div style="border-top: 1px solid rgba(128, 0, 128, 0.5); margin-top: auto; padding-top: 15px;">
                    <p style="color: #ff4d4d; font-size: 11px; font-weight: bold; margin-bottom: 15px; text-align: center; letter-spacing: 0.5px;">
                        ⚠️ Turbo VPN (USA Server) Recommended!
                    </p>
                    
                    ${item.isSeries 
                        ? `<button onclick="openSeriesModal(${item.id})" class="get-btn" style="width: 100%; height: 45px; border-radius: 8px; font-weight: bold; cursor: pointer;">VIEW EPISODES</button>` 
                        : `<a href="${item.url}" target="_blank" class="get-btn" style="width: 100%; height: 45px; border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-weight: bold;">DOWNLOAD NOW</a>`}
                </div>
            </div>
        `;
        resultContainer.appendChild(div);
    });
}

// 🍿 3. Series Detail Pop-up
function openSeriesModal(id) {
    const item = mwHubData.find(i => i.id === id);
    if (!item) return;

    let modal = document.getElementById('seriesModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'seriesModal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-card" style="border: 2px solid #ff0000; background: rgba(10,10,10,0.98); max-width: 450px;">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="modal-header" style="text-align: center;">
                <img src="${item.logo}" style="width: 120px; height: 170px; border-radius: 10px; margin-bottom: 15px; border: 2px solid #ff0000; object-fit: cover;">
                <h2 style="color: #fff; font-size: 1.6rem; margin-bottom: 5px;">${item.name}</h2>
                <p style="color: #ff0000; font-weight: bold; margin-bottom: 20px;">${item.category}</p>
                
                <a href="https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.turbovpn" target="_blank" 
                   style="display: block; background: #00c853; color: #fff; text-align: center; padding: 12px; border-radius: 10px; text-decoration: none; font-weight: bold; margin-bottom: 20px;">
                    🚀 DOWNLOAD TURBO VPN (FAST LOADING)
                </a>
                <p style="font-size: 0.9rem; color: #ddd; line-height: 1.6;">${item.desc}</p>
            </div>
            <div class="divider" style="background: purple; height: 2px; margin: 25px 0;"></div>
            <div class="ep-list">
                ${item.episodes.map(e => `
                    <div class="ep-row" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 0; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #fff; font-weight: bold;">${e.ep}</span>
                        <a href="${e.link}" target="_blank" class="ep-dl-link">DOWNLOAD</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('seriesModal');
    if (modal) modal.style.display = 'none';
}

// 🚀 4. Init & Listeners
window.addEventListener('DOMContentLoaded', () => {
    if (isSeriesPage) displayItems(mwHubData, true); 
});

if (searchInput) {
    searchInput.addEventListener('input', () => displayItems(mwHubData));
}

window.onclick = (event) => {
    const modal = document.getElementById('seriesModal');
    if (event.target == modal) closeModal();
}

function closePopup() {
    const popup = document.getElementById('welcome-popup');
    if (popup) {
        popup.style.display = 'none';
        sessionStorage.setItem('popupShown', 'true');
    }
}
