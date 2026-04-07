// 🎡 1. Swiper Slider Logic
const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    grabCursor: true,
});

// 🔍 2. Master Search & Filter Logic
const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

// Check karo ki user kaunse page par hai
const isSeriesPage = window.location.pathname.includes('series.html');

function displayItems(items) {
    if (searchInput.value.trim() === "") {
        resultContainer.innerHTML = '';
        return;
    }

    resultContainer.innerHTML = '';
    
    // 🎯 FILTER: Agar series page hai toh sirf SERIES dikhao
    let filteredItems = items;
    if (isSeriesPage) {
        filteredItems = items.filter(item => item.category === 'SERIES');
    }

    if (filteredItems.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; color:#ff0000; padding:20px;">No results found.</p>';
        return;
    }

    filteredItems.forEach(item => {
        const div = document.createElement('div');
        div.className = "search-item";
        
        // 🖼️ ICON LOGIC: Series/Movies ke liye lamba poster, baaki ke liye square
        const isVisual = (item.category === 'SERIES' || item.category === 'MOVIES');
        const imgClass = isVisual ? 'icon-poster' : 'icon-square';

        div.innerHTML = `
            <img src="${item.logo}" class="${imgClass}" alt="Poster">
            <div style="flex:1;">
                <h4 style="font-size:1rem; color:#fff; margin-bottom:2px;">${item.name}</h4>
                <p style="font-size:0.75rem; color:#bbb;">${item.category} • ${item.desc}</p>
            </div>
            ${item.isSeries 
                ? `<button onclick="openSeriesModal(${item.id})" class="get-btn">VIEW</button>` 
                : `<a href="${item.url}" target="_blank" class="get-btn">GET</a>`}
        `;
        resultContainer.appendChild(div);
    });
}

// 🍿 3. Series Detail Pop-up (Modal) Logic
function openSeriesModal(id) {
    const item = mwHubData.find(i => i.id === id);
    if (!item) return;

    // Modal Create/Update
    let modal = document.getElementById('seriesModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'seriesModal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-card">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="modal-header">
                <img src="${item.logo}" style="width:80px; height:110px; border-radius:8px; margin-bottom:10px; border:1px solid #ff0000;">
                <h2>${item.name}</h2>
                <p>${item.desc}</p>
            </div>
            
            <button class="download-all-btn" onclick="window.open('${item.downloadAll || '#'}', '_blank')">
                📥 Download Full Series (All Episodes)
            </button>

            <div class="divider"></div>

            <div class="ep-list">
                ${item.episodes.map(e => `
                    <div class="ep-row">
                        <span>${e.ep}</span>
                        <a href="${e.link}" target="_blank" class="ep-dl-link">DOWNLOAD</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('seriesModal').style.display = 'none';
}

// ⌨️ Search Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const results = mwHubData.filter(item => 
            item.name.toLowerCase().includes(val) || 
            item.category.toLowerCase().includes(val)
        );
        displayItems(results);
    });
}

// Modal band karne ke liye bahar click
window.onclick = function(event) {
    const modal = document.getElementById('seriesModal');
    if (event.target == modal) {
        closeModal();
    }
}
