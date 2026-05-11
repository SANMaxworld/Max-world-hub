// Initialize Swiper Slider
var swiper = new Swiper(".mySwiper", { 
    pagination: { el: ".swiper-pagination", clickable: true }, 
    autoplay: { delay: 3000, disableOnInteraction: false }, 
    loop: true, 
    grabCursor: true 
});

// SEARCH & OVERLAY ELEMENTS
const searchInput = document.getElementById('searchInput');
const searchOverlayUI = document.getElementById('searchOverlayUI'); // Naya overlay container
const searchResultsArea = document.getElementById('searchResultsArea');
const mainContentBody = document.getElementById('mainContentBody');

// --- 1. SEARCH FOCUS LOGIC (POPUP INTERFACE) ---
searchInput.addEventListener('focus', function() {
    // Jab user search bar click kare
    if (this.value.trim() === "") {
        searchOverlayUI.classList.add('active'); // Pop-up dikhao
        mainContentBody.style.display = "none";
        searchResultsArea.style.display = "none";
    }
});

// --- 2. SMART SEARCH & FILTERING ---
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    if (query.length > 0) {
        // Agar kuch likhna shuru kiya toh overlay (recent/popups) gayab
        searchOverlayUI.classList.remove('active');
        mainContentBody.style.display = "none";
        searchResultsArea.style.display = "grid"; 
        searchResultsArea.innerHTML = "";
        
        const filtered = animeData.filter(item => item.title.toLowerCase().includes(query));
        
        if (filtered.length > 0) {
            let resultHTML = '';
            filtered.forEach(item => { resultHTML += generateCardHTML(item); });
            searchResultsArea.innerHTML = resultHTML;
        } else {
            searchResultsArea.innerHTML = "<p style='text-align:center; grid-column: 1/-1; padding: 20px; color:#888;'>No results found.</p>";
        }
    } else {
        // Agar text mita diya toh wapas overlay (recent/everyone searching) dikhao
        searchOverlayUI.classList.add('active');
        searchResultsArea.style.display = "none";
    }
});

// --- 3. AUTO-FILL SEARCH TAGS ---
function fillSearch(term) {
    searchInput.value = term;
    // Trigger input event manually taaki filtering start ho jaye
    searchInput.dispatchEvent(new Event('input'));
}

// --- 4. MOVIE/SERIES TAB SWITCHER (HORIZONTAL SCROLL EFFECT) ---
function switchSearchTab(tabName, element) {
    // Tab text highlight switch
    document.querySelectorAll('.tab-link').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // Scroll content (Movie ya Series popup ko center mein laane ke liye)
    const container = document.querySelector('.tabs-content-container');
    if(tabName === 'movies') {
        container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        container.scrollTo({ left: container.offsetWidth, behavior: 'smooth' });
    }
}

// --- 5. CARD GENERATOR (PREMIUM REPLICA) ---
function generateCardHTML(item) {
    return `
    <a href="${item.link}" class="search-item">
        <span class="badge-hindi">${item.lang}</span>
        <img src="${item.img}" class="icon-poster" loading="lazy">
        <div class="content-box">
            <h4>${item.title}</h4>
            <p class="desc-text">${item.desc}</p>
        </div>
    </a>`;
}

// --- 6. DATA INJECTION ---
function loadSections() {
    const categories = ['trending', 'movies', 'fantasy', 'series', 'action', 'adventure', 'romance', 'scifi', 'horror', 'comedy', 'drama'];
    
    categories.forEach(cat => {
        const grid = document.getElementById(cat + '-grid');
        if (grid) {
            const categoryItems = animeData.filter(item => item.categories.includes(cat));
            let htmlContent = '';
            categoryItems.forEach(item => {
                htmlContent += generateCardHTML(item);
            });
            grid.innerHTML = htmlContent;
            
            if(categoryItems.length === 0) {
                grid.parentElement.style.display = "none";
            }
        }
    });
}

// --- EXPLORE POPUP ---
function toggleExplore() { 
    const pop = document.getElementById('explorePopup'); 
    pop.classList.toggle('show');
    pop.style.display = pop.classList.contains('show') ? "flex" : "none";
}

// Close search if clicked outside (Optional but good for UX)
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchOverlayUI.contains(e.target)) {
        if (searchInput.value.trim() === "") {
            searchOverlayUI.classList.remove('active');
            mainContentBody.style.display = "block";
        }
    }
});

document.addEventListener('DOMContentLoaded', loadSections);

