// Initialize Swiper Slider
var swiper = new Swiper(".mySwiper", { 
    pagination: { el: ".swiper-pagination", clickable: true }, 
    autoplay: { delay: 3000, disableOnInteraction: false }, 
    loop: true, 
    grabCursor: true 
});

// SIMPLE EXPLORE POPUP LOGIC (Toggle Fix)
function toggleExplore() { 
    const pop = document.getElementById('explorePopup'); 

    if (pop.style.display === "flex") {
        // Agar khula hai to turant band karo
        pop.style.display = "none";
        pop.classList.remove('show');
    } else {
        // Agar band hai to turant kholo
        pop.style.display = "flex";
        pop.classList.add('show');
    }
}

// SEARCH UI LOGIC (Untouched)
function toggleSearch(isFocus) { 
    const overlay = document.getElementById('searchOverlay'); 
    if(isFocus) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
        document.getElementById('searchInput').blur();
    }
}

// SEARCH FILTERING LOGIC (Untouched)
const searchInput = document.getElementById('searchInput');
const searchResultsArea = document.getElementById('searchResultsArea');
const mainContentBody = document.getElementById('mainContentBody');
const allCards = Array.from(document.querySelectorAll('.search-item'));

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    if (query.length > 0) {
        mainContentBody.style.display = "none";
        searchResultsArea.style.display = "grid";
        searchResultsArea.innerHTML = "";
        const filtered = allCards.filter(card => card.querySelector('h4').innerText.toLowerCase().includes(query));
        if (filtered.length > 0) {
            filtered.forEach(card => searchResultsArea.appendChild(card.cloneNode(true)));
        } else {
            searchResultsArea.innerHTML = "<p style='text-align:center; grid-column: 1/-1; padding: 20px;'>No results found.</p>";
        }
    } else {
        mainContentBody.style.display = "block";
        searchResultsArea.style.display = "none";
    }
});
