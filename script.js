/* MW HUB - LOGIC & SEARCH ENGINE 2026 
   Ye file search aur categories ko control karti hai.
*/

// 1. Elements ko select karna
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

// 2. Data dikhane ka function
function displayData(items) {
    resultContainer.innerHTML = ''; // Pehle purana maal saaf karo

    if (items.length === 0) {
        resultContainer.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Nahi mila! Kuch aur search karein.</p>';
        return;
    }

    items.forEach(item => {
        const card = `
            <div class="glass-container" style="margin:10px 0; animation: fadeIn 0.5s;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="${item.logo}" alt="Logo" style="width:50px; height:50px; border-radius:10px;">
                    <div>
                        <h4 style="color:#007bff;">${item.name}</h4>
                        <p style="font-size:0.8rem; color:#ccc;">${item.desc}</p>
                        <a href="${item.url}" target="_blank" class="nav-btn" style="padding:8px 15px; font-size:0.8rem; margin-top:10px; display:inline-block;">Download ZIP</a>
                    </div>
                </div>
            </div>
        `;
        resultContainer.innerHTML += card;
    });
}

// 3. Search Bar Logic (Live Search)
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = mwHubData.filter(item => 
            item.name.toLowerCase().includes(term) || 
            item.category.toLowerCase().includes(term)
        );
        
        // Agar search box khali hai toh results chhupa do (Optional)
        if (term === "") {
            resultContainer.innerHTML = "";
        } else {
            displayData(filtered);
        }
    });
}

// 4. Zip Extraction Tip for SEO/User
console.log("MW Hub Tip: All files are in ZIP format. Extract after download!");
