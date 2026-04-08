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
        resultContainer.className = "movie-layout-grid"; // PC Layout Fix
    } else {
        resultContainer.className = "default-list-layout"; // Apps Layout
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
        div.className = "search-item";
        const isVisual = (item.category === 'SERIES' || item.category === 'MOVIES');
        const imgClass = isVisual ? 'icon-poster' : 'icon-square';

        div.innerHTML = `
            <img src="${item.logo}" class="${imgClass}" alt="Poster">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
            </div>
            ${item.isSeries 
                ? `<button onclick="openSeriesModal(${item.id})" class="get-btn">VIEW</button>` 
                : `<a href="${item.url}" target="_blank" class="get-btn">GET</a>`}
        `;
        resultContainer.appendChild(div);
    });
}

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
                <img src="${item.logo}" class="modal-img">
                <h2>${item.name}</h2>
                <p class="tag">${item.category}</p>
            </div>
            <button class="download-all-btn" onclick="window.open('${item.downloadAll || '#'}', '_blank')">
                📥 Download Full Series
            </button>
            <div class="ep-list">
                ${item.episodes.map(e => `
                    <div class="ep-row">
                        <span>Episode ${e.ep}</span>
                        <a href="${e.link}" target="_blank" class="ep-dl-link">DOWNLOAD</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal() { document.getElementById('seriesModal').style.display = 'none'; }
window.onclick = (e) => { if (e.target.className === 'modal-overlay') closeModal(); }
