let channels = [];
let currentCategory = "all";

async function loadChannels() {
    try {

        const response = await fetch("data/playlist.json");
        channels = await response.json();

        renderChannels(channels);

        const saved = localStorage.getItem("lastChannel");

        if(saved){
            playChannel(JSON.parse(saved));
        }else if(channels.length){
            playChannel(channels[0]);
        }

        hideLoader();

    } catch(err){
        console.error(err);
    }
}

function renderChannels(list){

    const grid =
        document.getElementById("channelGrid");

    grid.innerHTML = "";

    list.forEach(channel => {

        const card =
        document.createElement("div");

        card.className = "channel-card";

        card.innerHTML = `
            <img src="${channel.logo}">
            <h4>${channel.name}</h4>
        `;

        card.onclick = () => playChannel(channel);

        grid.appendChild(card);

    });

}

function filterCategory(category){

    currentCategory = category;

    if(category === "all"){
        renderChannels(channels);
        return;
    }

    const filtered =
        channels.filter(
            item => item.category === category
        );

    renderChannels(filtered);
}

function setupCategories(){

    document
    .querySelectorAll("[data-category]")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            document
            .querySelectorAll(".nav-btn")
            .forEach(x =>
                x.classList.remove("active")
            );

            if(btn.classList.contains("nav-btn")){
                btn.classList.add("active");
            }

            filterCategory(
                btn.dataset.category
            );

        });

    });

}

function setupClock(){

    function update(){

        const now = new Date();

        document.getElementById("clock")
        .innerHTML =
            now.toLocaleTimeString();

    }

    update();

    setInterval(update,1000);

}

function hideLoader(){

    const loader =
        document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
    },800);

}

function setupBanner(){

    const banners = [
        "assets/banner1.jpg",
        "assets/banner2.jpg",
        "assets/banner3.jpg"
    ];

    let current = 0;

    setInterval(() => {

        const img =
        document.querySelector(
            ".hero-banner img"
        );

        current++;

        if(current >= banners.length){
            current = 0;
        }

        img.src = banners[current];

    },5000);

}

function setupFavorites(){

    window.toggleFavorite =
    function(channelId){

        let favs =
            JSON.parse(
                localStorage.getItem("favorites")
                || "[]"
            );

        if(favs.includes(channelId)){
            favs =
            favs.filter(
                x => x !== channelId
            );
        }else{
            favs.push(channelId);
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favs)
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupClock();

        setupCategories();

        setupBanner();

        setupFavorites();

        loadChannels();

    }
);
