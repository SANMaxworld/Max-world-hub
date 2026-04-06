// script.js - Only for Search functionality
const resultContainer = document.getElementById('resultContainer');
const searchInput = document.getElementById('searchInput');

function displayItems(items) {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Agar search box khali hai, toh niche results area saaf rakho
    if (searchTerm === "") {
        resultContainer.innerHTML = '';
        return;
    }

    resultContainer.innerHTML = '';
    
    if (items.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">No items found.</p>';
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = "background:rgba(255,255,255,0.05); padding:15px; border-radius:15px; margin-bottom:15px; display:flex; align-items:center; gap:15px; border:1px solid rgba(255,255,255,0.1); animation: fadeIn 0.3s ease-in-out;";
        div.innerHTML = `
            <img src="${item.logo}" style="width:55px; height:55px; border-radius:10px; border:1px solid rgba(255,255,255,0.1);">
            <div style="flex:1;">
                <h4 style="margin-bottom:3px; font-size:0.95rem;">${item.name}</h4>
                <p style="font-size:0.8rem; color:#aaa;">${item.desc}</p>
            </div>
            <a href="${item.url}" target="_blank" style="background:#007bff; color:#fff; padding:8px 15px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.8rem;">GET</a>
        `;
        resultContainer.appendChild(div);
    });
}

// Search Logic Setup
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = mwHubData.filter(item => 
            item.name.toLowerCase().includes(val) || item.category.toLowerCase().includes(val)
        );
        displayItems(filtered);
    });
}
