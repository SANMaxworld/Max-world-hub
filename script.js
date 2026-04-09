// 🔍 Master Search & Result Logic (Movies & Series Dono Ke Liye)
function displayItems(items, isInitialLoad = false) {
    const query = searchInput.value.trim().toLowerCase();

    if (!isSeriesPage && query === "" && !isInitialLoad) {
        resultContainer.innerHTML = '';
        return;
    }

    // Grid Container Style (Ek ke bagal mein ek set karne ke liye)
    resultContainer.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; padding: 10px;";
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
        // Khada Card (Poster Layout)
        div.style.cssText = "display: flex; flex-direction: column; cursor: pointer; transition: 0.3s;";
        
        // Card Click Logic (Series hai toh Modal, Movie hai toh Direct Link)
        if (item.isSeries) {
            div.onclick = () => openSeriesModal(item.id);
        } else {
            div.onclick = () => window.open(item.url, '_blank');
        }

        div.innerHTML = `
            <div style="width: 100%; aspect-ratio: 2/3; overflow: hidden; border-radius: 10px; border: 1px solid #333; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                <img src="${item.logo}" style="width: 100%; height: 100%; object-fit: cover;" alt="${item.name}">
            </div>

            <div style="padding: 8px 2px; text-align: center;">
                <h4 style="font-size: 0.9rem; color: #fff; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">
                    ${item.name}
                </h4>
                <p style="font-size: 0.7rem; color: #ff0000; font-weight: bold; margin-top: 2px; text-transform: uppercase;">
                    ${item.category}
                </p>
            </div>
        `;
        resultContainer.appendChild(div);
    });
}
