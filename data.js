// MAX WORLD HUB - MASTER STORAGE SYSTEM
const animeData = [
    {
        id: "death-note",
        title: "Death Note",
        img: "assets/NOTE.jpeg",
        lang: "HINDI",
        link: "anime/death-note.html",
        desc: "Psychological",
        categories: ["trending", "drama"]
    },
    {
        id: "aot-s1",
        title: "Attack on Titan S1",
        img: "assets/A.O.T.jpeg",
        lang: "HINDI",
        link: "anime/Attack-on-Titan.html",
        desc: "Action",
        categories: ["trending", "action"]
    },
    {
        id: "ds-s1",
        title: "Demon Slayer S1",
        img: "assets/D.S poster.jpeg",
        lang: "HINDI",
        link: "anime/demon-slayer-s1.html",
        desc: "Action",
        categories: ["trending", "fantasy", "adventure"]
    },
    {
        id: "sl-s1",
        title: "Solo Leveling S1",
        img: "assets/soloposter.jpeg",
        lang: "HINDI",
        link: "anime/solo-leveling-s1.html",
        desc: "Fantasy",
        categories: ["trending", "fantasy", "action"]
    },
    {
        id: "your-name",
        title: "Your Name",
        img: "assets/movie_sample.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Romance",
        categories: ["movies"]
    },
    {
        id: "suzume",
        title: "Suzume",
        img: "assets/suzume-poster.jpg",
        lang: "HINDI",
        link: "movie/suzume.html",
        desc: "Fantasy",
        categories: ["movies", "fantasy"]
    },
    {
        id: "money-heist",
        title: "Money Heist",
        img: "assets/series_sample.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Thriller",
        categories: ["series"]
    },
    {
        id: "stranger-things",
        title: "Stranger Things",
        img: "assets/series2_sample.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Sci-Fi",
        categories: ["series"]
    },
    {
        id: "Chainsaw-Man-S1",
        title: "chainshow Man",
        img: "assets/C-Man-s1-poster.jpg",
        lang: "HINDI",
        link: "anime/Chainsaw-Man-S1.html",
        desc: "Adventure",
        categories: ["adventure"]
    },
    {
        id: "horimiya",
        title: "Horimiya",
        img: "assets/rom_sample.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Romance",
        categories: ["romance"]
    },
    {
        id: "dr-stone",
        title: "Dr. Stone",
        img: "assets/sci_sample.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Sci-Fi",
        categories: ["scifi"]
    },
    {
        id: "tokyo-ghoul",
        title: "Tokyo Ghoul",
        img: "assets/hor_sample.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Horror",
        categories: ["horror"]
    },
    {
        id: "spy-x-family",
        title: "Spy x Family",
        img: "assets/com_sample.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Comedy",
        categories: ["comedy"]
    },
    {
        id: "mufasa-the-lion-king",
        title: "Mufasa: The Lion King",
        img: "assets/mufasa-the-lion-king-poster.jpg",
        lang: "HINDI",
        link: "movie/mufasa-the-lion-king.html",
        desc: "Adventure",
        categories: ["movies", "adventure", "drama"]
    },
    {
        id: "shang-chi-legend-of-the-ten-rings",
        title: "Shang-Chi and the Legend of the Ten Rings",
        img: "assets/S.C.T.R.jpeg",
        lang: "HINDI",
        link: "movie/Shang-Chi.html",
        desc: "Action",
        categories: ["movies", "action", "fantasy"]
    },
    {
        id: "the-conjuring",
        title: "The Conjuring",
        img: "assets/conjuring.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Horror",
        categories: ["movies", "horror"]
    },
    {
        id: "a-silent-voice",
        title: "A Silent Voice",
        img: "assets/silent_voice.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Drama",
        categories: ["movies", "drama", "romance"]
    },
    {
        id: "the-pradeeps-of-pittsburgh",
        title: "The Pradeeps of Pittsburgh",
        img: "assets/the_pradeeps_of_pittsburgh.jpg",
        lang: "HINDI",
        link: "series/The-Pradeeps-Of-Pittsburgh-S1.html",
        desc: "Comedy",
        categories: ["series", "comedy"]
    },
    {
        id: "shin-chan-the-flower-of-tenkazu-academy",
        title: "Crayon Shin-chan: Shrouded in Mystery! The Flowers of Tenkazu Academy",
        img: "assets/shinchan_tenkazu.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Comedy",
        categories: ["movies", "comedy", "adventure"]
    },
    {
        id: "shin-chan-the-spicy-kasukabe-dancers",
        title: "Crayon Shin-chan: Fierceness! Intense Jump! Spicy Kasukabe Boys",
        img: "assets/shinchan_spicy.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Comedy",
        categories: ["movies", "comedy", "adventure"]
    },
    {
        id: "final-destination-bloodlines",
        title: "Final Destination: Bloodlines",
        img: "assets/final_destination.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Horror",
        categories: ["movies", "horror"]
    },
    {
        id: "solo-leveling-s2",
        title: "Solo Leveling S2 -Arise from the Shadow-",
        img: "assets/solo_leveling_s2.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Fantasy",
        categories: ["action", "fantasy"]
    },
    {
        id: "re-zero-s1",
        title: "Re:ZERO -Starting Life in Another World- S1",
        img: "assets/rezero_s1.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Fantasy",
        categories: ["fantasy", "drama", "horror"]
    },
    {
        id: "re-zero-s2",
        title: "Re:ZERO -Starting Life in Another World- S2",
        img: "assets/rezero_s2.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Fantasy",
        categories: ["fantasy", "drama", "horror"]
    },
    {
        id: "the-angel-next-door-spoils-me-rotten",
        title: "The Angel Next Door Spoils Me Rotten",
        img: "assets/angel_next_door.jpeg",
        lang: "HINDI",
        link: "#",
        desc: "Romance",
        categories: ["romance", "comedy"]
    }
];
