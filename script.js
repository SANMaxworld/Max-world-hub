// 🎡 1. Swiper Slider Logic (Isko nahi chheda, ye waisa hi hai)
if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
        loop: true, 
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        grabCursor: true,
    });
}

// 🔍 2. Naya "Instant HTML Filter" Search System
// Ye system data.js ki bajaye seedha HTML cards ko scan karta hai
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.search-item');
        let hasResults = false;

        cards.forEach(card => {
            // Card ke andar likha hua Title pakdega (H4 tag)
            const title = card.querySelector('h4').innerText.toLowerCase();
            // Ya fir card ke 'data-name' attribute se bhi check kar sakta hai
            const dataName = card.getAttribute('data-name') ? card.getAttribute('data-name').toLowerCase() : "";

            if (title.includes(query) || dataName.includes(query)) {
                card.style.display = 'flex'; // Match hua toh dikhao
                hasResults = true;
            } else {
                card.style.display = 'none'; // Match nahi hua toh chhupao
            }
        });

        // 📋 3. "No Results" ka message handle karna
        const oldMsg = document.getElementById('no-result-msg');
        if (!hasResults && query !== "") {
            if (!oldMsg) {
                const p = document.createElement('p');
                p.id = 'no-result-msg';
                p.style = "text-align:center; color:#ff0000; width:100%; padding:20px;";
                p.innerText = "No Results Found";
                resultContainer.appendChild(p);
            }
        } else if (oldMsg) {
            oldMsg.remove();
        }
    });
}
