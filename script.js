// 🎡 Swiper Slider (Fix for Mobile/PC)
const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    grabCursor: true,
});

// 🔍 Search Logic
const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

function displayItems(items) {
    if (searchInput.value.trim() === "") {
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
        div.style.cssText = "background:rgba(255,255,255,0.05); padding:12px; border-radius:15px; margin-bottom:15px; border:1px solid rgba(255,0,0,0.2);";
        
        // 🛠️ YAHAN HAI FIX: Pehle sirf clean info dikhegi
        let actionContent = `<a href="${item.url}" target="_blank" class="get-btn" style="background:#ff0000; color:#fff; padding:8px 15px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.8rem;">GET</a>`;
        
        if (item.isSeries) {
            // Series ke liye "View Episodes" button
            actionContent = `<button onclick="toggleEpisodes(${item.id})" style="background:#222; color:#ff0000; padding:8px 12px; border-radius:8px; border:1px solid #ff0000; cursor:pointer; font-weight:700; font-size:0.75rem;">VIEW EPISODES</button>`;
        }

        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${item.logo}" style="width:60px; height:60px; border-radius:10px; border:1px solid #ff0000; object-fit:cover;">
                <div style="flex:1;">
                    <h4 style="font-size:1rem; color:#fff; margin-bottom:2px;">${item.name}</h4>
                    <p style="font-size:0.75rem; color:#bbb;">${item.desc}</p>
                </div>
                ${actionContent}
            </div>
            <div id="ep-list-${item.id}" style="display:none; margin-top:15px; border-top:1px solid rgba(255,0,0,0.2); padding-top:10px;">
                ${item.isSeries ? item.episodes.map(e => `
                    <a href="${e.link}" target="_blank" style="display:block; background:rgba(255,0,0,0.1); color:#fff; padding:10px; margin-bottom:5px; border-radius:8px; text-decoration:none; font-size:0.8rem; border-left:4px solid #ff0000;">📥 Download ${e.ep}</a>
                `).join('') : ''}
            </div>
        `;
        resultContainer.appendChild(div);
    });
}

// 🟢 Toggle Function: Click karne par hi episodes khulenge
function toggleEpisodes(id) {
    const el = document.getElementById(`ep-list-${id}`);
    if (el.style.display === "none") {
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
}

// Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = mwHubData.filter(item => 
            item.name.toLowerCase().includes(val) || item.category.toLowerCase().includes(val)
        );
        displayItems(filtered);
    });
}
