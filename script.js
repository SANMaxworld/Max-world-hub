// 🎡 1. Swiper Slider Logic
if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
        loop: true, 
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        grabCursor: true,
    });
}

// 🔍 2. Dynamic Search System & Glassmorphism
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');
const searchOverlay = document.getElementById('searchOverlay');

// Elements to hide during search so cards snap right below the search bar
const heroSlider = document.getElementById('heroSlider');
const navButtons = document.getElementById('navButtons');
const trendingHeading = document.getElementById('trendingHeading');
const introBox = document.getElementById('introBox');

if (searchInput) {
    searchInput.addEventListener('focus', () => {
        if(searchOverlay) searchOverlay.classList.add('active');
    });

    if(searchOverlay) {
        searchOverlay.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchInput.blur();
            
            // Restore hidden elements
            if(heroSlider) heroSlider.style.display = '';
            if(navButtons) navButtons.style.display = 'grid'; // restoring grid display
            if(trendingHeading) trendingHeading.style.display = '';
            if(introBox) introBox.style.display = '';
            
            document.querySelectorAll('.search-item').forEach(card => card.style.display = 'flex');
            const msg = document.getElementById('no-result-msg');
            if(msg) msg.remove();
        });
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.search-item');
        let hasResults = false;

        // Hide intermediate UI so the results container appears directly below the input
        if (query !== "") {
            if(heroSlider) heroSlider.style.display = 'none';
            if(navButtons) navButtons.style.display = 'none';
            if(trendingHeading) trendingHeading.style.display = 'none';
            if(introBox) introBox.style.display = 'none';
        } else {
            if(heroSlider) heroSlider.style.display = '';
            if(navButtons) navButtons.style.display = 'grid';
            if(trendingHeading) trendingHeading.style.display = '';
            if(introBox) introBox.style.display = '';
        }

        cards.forEach(card => {
            const title = card.querySelector('h4').innerText.toLowerCase();
            const dataName = card.getAttribute('data-name') ? card.getAttribute('data-name').toLowerCase() : "";

            if (title.includes(query) || dataName.includes(query)) {
                card.style.display = 'flex'; 
                hasResults = true;
            } else {
                card.style.display = 'none'; 
            }
        });

        // 📋 3. Handle "No Results" message
        const oldMsg = document.getElementById('no-result-msg');
        if (!hasResults && query !== "") {
            if (!oldMsg) {
                const p = document.createElement('p');
                p.id = 'no-result-msg';
                p.style = "text-align:center; color:#ff0000; width:100%; padding:20px; grid-column: 1 / -1; font-weight: bold;";
                p.innerText = "No Anime Found. Try another name!";
                resultContainer.appendChild(p);
            }
        } else if (oldMsg) {
            oldMsg.remove();
        }
    });
}
