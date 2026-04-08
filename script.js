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

// Smart Page Detection
const isSeriesPage = window.location.pathname.includes('series.html');

function displayItems(items, isInitialLoad = false) {
    const query = searchInput.value.trim().toLowerCase();

    // Home Page par tabhi dikhao jab search ho, Series page par hamesha dikhao
    if (!isSeriesPage && query === "" && !isInitialLoad) {
        resultContainer.innerHTML = '';
        return;
    }

    resultContainer.innerHTML = '';
    
    // Filter by Category
    let filtered = items;
    if (isSeriesPage) {
        filtered = items.filter(item => item.category === 'SERIES');
    }

    // Search Filter
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
        div.className = "search-item";
        
        // Dynamic Icon/Poster Logic
        const isVisual = (item.category === 'SERIES' || item.category === 'MOVIES');
        const imgClass = isVisual ? 'icon-poster' : 'icon-square';

        div.innerHTML = `
            <img src="${item.logo}" class="${imgClass}" alt="Poster">
            <div style="flex:1;">
                <h4 style="font-size:1rem; color:#fff; margin-bottom:2px;">${item.name}</h4>
                <p style="font-size:0.75rem; color:#bbb;">${item.desc}</p>
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
                <img src="${item.logo}" style="width:80px; height:110px; border-radius:8px; margin-bottom:10px; border:1px solid #ff0000; object-fit:cover;">
                <h2>${item.name}</h2>
                <p style="color:#ff0000; font-weight:bold;">${item.category}</p>
                <p style="font-size:0.85rem; margin-top:5px;">${item.desc}</p>
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
    const modal = document.getElementById('seriesModal');
    if (modal) modal.style.display = 'none';
}

// 🚀 4. Trigger Auto-Load on Page Start
window.addEventListener('DOMContentLoaded', () => {
    if (isSeriesPage) {
        displayItems(mwHubData, true); // Anime page khulte hi cards dikhayega
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
