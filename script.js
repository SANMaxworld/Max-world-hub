// 🎡 1. Swiper Slider Logic (5 Images + Mobile Touch Support)
const swiper = new Swiper('.mySwiper', {
    loop: true,
    speed: 800,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true,
    touchEventsTarget: 'container',
});

// 🔍 2. Automated Search & Series System
const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

function displayItems(items) {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
        resultContainer.innerHTML = '';
        return;
    }

    resultContainer.innerHTML = '';
    
    if (items.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; color:#ff0000; padding:20px;">No items found.</p>';
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = "search-result-item"; // Make sure to style this in CSS
        
        // Check if it's a Series to show Episode List
        let actionHTML = `<a href="${item.url}" target="_blank" class="get-btn">GET</a>`;
        
        if (item.isSeries) {
            let epList = item.episodes.map(e => 
                `<a href="${e.link}" target="_blank" style="display:block; background:#222; color:#ff0000; padding:5px; margin-top:5px; border-radius:5px; text-decoration:none; font-size:0.7rem; border:1px solid #ff0000;">Download ${e.ep}</a>`
            ).join('');
            
            actionHTML = `<div class="ep-container">${epList}</div>`;
        }

        div.style.cssText = "background:rgba(255,255,255,0.05); padding:15px; border-radius:15px; margin-bottom:15px; border:1px solid rgba(255,0,0,0.2);";
        
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${item.logo}" style="width:50px; height:50px; border-radius:10px; border:1px solid #ff0000;">
                <div style="flex:1;">
                    <h4 style="font-size:0.9rem; color:#fff;">${item.name}</h4>
                    <p style="font-size:0.75rem; color:#bbb;">${item.desc}</p>
                </div>
                ${!item.isSeries ? actionHTML : ''}
            </div>
            ${item.isSeries ? `<div style="margin-top:10px;">${actionHTML}</div>` : ''}
        `;
        resultContainer.appendChild(div);
    });
}

// Search Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = mwHubData.filter(item => 
            item.name.toLowerCase().includes(val) || 
            item.category.toLowerCase().includes(val)
        );
        displayItems(filtered);
    });
}

// 🔴 Search Bar Red Glow on Click
searchInput.addEventListener('focus', () => {
    searchInput.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.6)";
    searchInput.style.borderColor = "#ff0000";
});
searchInput.addEventListener('blur', () => {
    searchInput.style.boxShadow = "none";
    searchInput.style.borderColor = "rgba(255,255,255,0.1)";
});
