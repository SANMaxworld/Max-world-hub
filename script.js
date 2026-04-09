// 🎡 1. Swiper Slider (Only runs if element exists on page)
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
        
        // Inline styles to fix the "Text jumping up" and "Small image" problem
        div.style.cssText = "display: flex; align-items: center; gap: 15px; padding: 12px; margin-bottom: 15px; background: rgba(20,20,30,0.8); border-radius: 12px; border: 1px solid #333;";

        const isVisual = (item.category === 'SERIES' || item.category === 'MOVIES');
        
        // Fixed Image Size (Taaki text ke samne choti na lage)
        const imgStyle = isVisual 
            ? "width: 100px; min-width: 100px; height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid #ff0000;" 
            : "width: 80px; min-width: 80px; height: 80px; object-fit: cover; border-radius: 10px; border: 1px solid #00ff00;";

        div.innerHTML = `
            <img src="${item.logo}" style="${imgStyle}" alt="Poster">
            
            <div style="flex:1; display: flex; flex-direction: column; justify-content: center;">
                <h4 style="font-size:1.1rem; color:#fff; margin: 0 0 5px 0; font-weight: bold;">${item.name}</h4>
                
                <p style="font-size:0.8rem; color:#bbb; margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${item.desc}
                </p>
                
                <div style="border-top: 1px solid purple; margin: 10px 0 5px 0; opacity: 0.5;"></div>
                
                <p style="color: #ff4d4d; font-size: 10px; font-weight: bold; margin: 0;">
                    ⚠️ Use Turbo VPN (USA Server) if not loading!
                </p>
            </div>

            <div style="margin-left: 5px;">
                ${item.isSeries 
                    ? `<button onclick="openSeriesModal(${item.id})" class="get-btn" style="padding: 10px 15px;">WATCH</button>` 
                    : `<a href="${item.url}" target="_blank" class="get-btn" style="padding: 10px 15px; text-decoration: none; display: inline-block;">WATCH</a>`}
            </div>
        `;
        resultContainer.appendChild(div);
    });
}

// 🍿 3. Series Detail Pop-up (Modal) Logic
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
        <div class="modal-card" style="border: 2px solid #ff0000; background: rgba(10,10,10,0.98); width: 90%; max-width: 400px;">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="modal-header" style="text-align: center;">
                <img src="${item.logo}" style="width:100px; height:140px; border-radius:8px; margin-bottom:10px; border:2px solid #ff0000; object-fit:cover;">
                <h2 style="color:#fff; font-size: 1.5rem;">${item.name}</h2>
                <p style="color:#ff0000; font-weight:bold;">${item.category}</p>
                
                <a href="https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.turbovpn" target="_blank" 
                   style="display:block; background:#00c853; color:#fff; text-align:center; padding:12px; border-radius:10px; text-decoration:none; font-weight:bold; margin-top:15px; font-size:13px;">
                    🚀 DOWNLOAD TURBO VPN
                </a>

                <p style="font-size:0.85rem; margin-top:12px; color:#ddd; line-height: 1.4;">${item.desc}</p>
            </div>

            <div class="divider" style="background: purple; height: 2px; margin: 15px 0;"></div>

            <div class="ep-list" style="max-height: 250px; overflow-y: auto;">
                ${item.episodes.map(e => `
                    <div class="ep-row" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 10px 0; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color:#fff; font-weight:bold;">${e.ep}</span>
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

// 🚀 4. Trigger Auto-Load on Page Start
window.addEventListener('DOMContentLoaded', () => {
    if (isSeriesPage) {
        displayItems(mwHubData, true); 
    }
});

// Search Listener
if (searchInput) {
    searchInput.addEventListener('input', () => {
        displayItems(mwHubData);
    });
}

// Click outside modal to close
window.onclick = (event) => {
    const modal = document.getElementById('seriesModal');
    if (event.target == modal) closeModal();
}

// Pop-up Close Logic
function closePopup() {
    const popup = document.getElementById('welcome-popup');
    if (popup) {
        popup.style.display = 'none';
        sessionStorage.setItem('popupShown', 'true');
    }
}
