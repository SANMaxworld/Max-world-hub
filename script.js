// 🎡 1. Initialize Swiper Slider (Automatic Scroll)
const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// 🔍 2. Search Functionality
const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

function displayItems(items) {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Clear results if search is empty
    if (searchTerm === "") {
        resultContainer.innerHTML = '';
        return;
    }

    resultContainer.innerHTML = '';
    
    if (items.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; color:#ff4444; padding:20px; font-weight:600;">❌ No items found.</p>';
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        // Updated styling to match Neon Red Theme
        div.style.cssText = `
            background: rgba(255, 255, 255, 0.05); 
            padding: 12px; 
            border-radius: 15px; 
            margin-bottom: 12px; 
            display: flex; 
            align-items: center; 
            gap: 15px; 
            border: 1px solid rgba(255, 0, 0, 0.2);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;
        
        div.innerHTML = `
            <img src="${item.logo}" style="width:50px; height:50px; border-radius:10px; border:1px solid rgba(255,255,255,0.1); object-fit:cover;">
            <div style="flex:1;">
                <h4 style="margin-bottom:2px; font-size:0.9rem; color:#fff;">${item.name}</h4>
                <p style="font-size:0.75rem; color:#bbb;">${item.desc}</p>
            </div>
            <a href="${item.url}" target="_blank" style="background:#ff0000; color:#fff; padding:8px 12px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.75rem; box-shadow: 0 0 10px rgba(255,0,0,0.3);">GET</a>
        `;
        resultContainer.appendChild(div);
    });
}

// Search Input Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        // mwHubData should be defined in data.js
        const filtered = mwHubData.filter(item => 
            item.name.toLowerCase().includes(val) || 
            item.category.toLowerCase().includes(val)
        );
        displayItems(filtered);
    });
}
