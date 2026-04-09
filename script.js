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

    // Grid Layout: Ek ke bagal mein ek cards (Netflix Style)
    resultContainer.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; padding: 15px;";
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
        resultContainer.innerHTML = '<p style="text-align:center; color:#ff0000; padding:20px; grid-column: 1/-1;">No results found.</p>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = "search-item card-glow"; 
        
        // Khada Card Style
        div.style.cssText = "display: flex; flex-direction: column; background: #111; border-radius: 10px; overflow: hidden; border: 1px solid #333; transition: 0.3s; cursor: pointer;";

        // Card Click Logic
        div.onclick = () => {
            if (item.isSeries) {
                openSeriesModal(item.id);
            } else {
                window.open(item.url, '_blank');
            }
        };

        div.innerHTML = `
            <div style="width: 100%; height: 210px; overflow: hidden;">
                <img src="${item.logo}" style="width: 100%; height: 100%; object-fit: cover;" alt="Poster">
            </div>

            <div style="padding: 10px; flex: 1; display: flex; flex-direction: column;">
                <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${item.name}
                </h4>
                
                <p style="font-size: 0.75rem; color: #bbb; line-height: 1.3; height: 2.6em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; margin-bottom: 10px;">
                    ${item.desc}
                </p>
                
                <div style="margin-top: auto;">
                    <div style="border-top: 1px solid purple; margin-bottom: 8px; opacity: 0.5;"></div>
                    <p style="color: #ff4d4d; font-size: 9px; font-weight: bold; text-align: center; text-transform: uppercase;">
                        ${item.isSeries ? 'Series (View)' : 'Movie (Get)'}
                    </p>
                </div>
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
        <div class="modal-card" style="border: 2px solid #ff0000; background: rgba(10,10,10,0.98); max-width: 400px; width: 90%;">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="modal-header" style="text-align: center;">
                <img src="${item.logo}" style="width:100px; height:140px; border-radius:8px; margin-bottom:12px; border:2px solid #ff0000; object-fit:cover;">
                <h2 style="color:#fff; font-size: 1.4rem;">${item.name}</h2>
                <p style="color:#ff0000; font-weight:bold; font-size: 0.8rem;">${item.category}</p>
                
                <a href="https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.turbovpn" target="_blank" 
                   style="display:block; background:#00c853; color:#fff; text-align:center; padding:10px; border-radius:8px; text-decoration:none; font-weight:bold; margin-top:15px; font-size:12px;">
                    🚀 DOWNLOAD TURBO VPN
                </a>

                <p style="font-size:0.8rem; margin-top:12px; color:#ddd; line-height: 1.4;">${item.desc}</p>
            </div>

            <div class="divider" style="background: purple; height: 1px; margin: 20px 0;"></div>

            <div class="ep-list" style="max-height: 250px; overflow-y: auto;">
                ${item.episodes.map(e => `
                    <div class="ep-row" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 10px 0; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color:#fff; font-weight:bold; font-size: 14px;">${e.ep}</span>
                        <a href="${e.link}" target="_blank" class="ep-dl-link" style="padding: 5px 12px; font-size: 12px;">DOWNLOAD</a>
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
    if (isSeriesPage) {
        displayItems(mwHubData, true); 
    }
});

if (searchInput) {
    searchInput.addEventListener('input', () => {
        displayItems(mwHubData);
    });
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
