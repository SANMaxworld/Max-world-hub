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

// ✅ MOD: Movies aur Series dono pages ko recognize karo
const isSeriesPage = window.location.pathname.includes('series.html');
const isMoviePage = window.location.pathname.includes('movies.html');

function displayItems(items, isInitialLoad = false) {
    const query = searchInput.value.trim().toLowerCase();

    // ✅ MOD: Dono pages par khali search par bhi initial load chalne do
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
        resultContainer.innerHTML = '<p style="text-align:center; color:#ff0000; padding:20px;">No results found.</p>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = "search-item card-glow"; 
        
        const isVisual = (item.category === 'SERIES' || item.category === 'MOVIES');
        const imgClass = isVisual ? 'icon-poster' : 'icon-square';

        // ✅ MOD: Poster aur Text ko center karne ke liye layout fix
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "15px";

        div.innerHTML = `
            <img src="${item.logo}" class="${imgClass}" alt="Poster" style="flex-shrink:0;">
            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; overflow:hidden;">
                <h4 style="font-size:1rem; color:#fff; margin-bottom:2px;">${item.name}</h4>
                
                <p style="font-size:0.75rem; color:#bbb; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis; line-height:1.4;">
                    ${item.desc}
                </p>
                
                <div style="border-top: 1px solid purple; margin: 8px 0 5px 0;"></div>
                <p style="color: #ff4d4d; font-size: 10px; font-weight: bold; line-height:1.2; margin:0;">
                    ⚠️ Agar page load na ho toh Turbo VPN (USA Server) use karein!
                </p>
            </div>
            <div style="margin-left: 5px;">
                ${item.isSeries 
                    ? `<button onclick="openSeriesModal(${item.id})" class="get-btn">VIEW</button>` 
                    : `<a href="${item.url}" target="_blank" class="get-btn" style="text-decoration:none;">GET</a>`}
            </div>
        `;
        resultContainer.appendChild(div);
    });
}

// 🍿 3. Series Detail Pop-up (Modal) Logic - (Original)
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
        <div class="modal-card" style="border: 2px solid #ff0000; background: rgba(15,15,15,0.95);">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="modal-header">
                <img src="${item.logo}" style="width:80px; height:110px; border-radius:8px; margin-bottom:10px; border:1px solid #ff0000; object-fit:cover;">
                <h2 style="color:#fff;">${item.name}</h2>
                <p style="color:#ff0000; font-weight:bold; letter-spacing:1px;">${item.category}</p>
                
                <a href="https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.turbovpn" target="_blank" 
                   style="display:block; background:#00c853; color:#fff; text-align:center; padding:12px; border-radius:10px; text-decoration:none; font-weight:bold; margin-top:15px; font-size:13px; box-shadow: 0 4px 12px rgba(0,200,83,0.4);">
                    🚀 DOWNLOAD TURBO VPN (FAST LOADING)
                </a>

                <p style="font-size:0.85rem; margin-top:12px; color:#ddd;">${item.desc}</p>
            </div>

            <div class="divider" style="background: purple; height: 2px; margin: 15px 0;"></div>

            <div class="ep-list">
                ${item.episodes.map(e => `
                    <div class="ep-row" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 10px 0;">
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
    // ✅ MOD: Movies aur Series dono pages par auto-load chalega
    if (isSeriesPage || isMoviePage) {
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

// Pop-up Close Logic (From Index.html)
function closePopup() {
    const popup = document.getElementById('welcome-popup');
    if (popup) {
        popup.style.display = 'none';
        sessionStorage.setItem('popupShown', 'true');
    }
}
