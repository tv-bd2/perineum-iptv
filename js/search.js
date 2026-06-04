const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener(
    "input",
    function(){

        const keyword =
        this.value.toLowerCase();

        const filtered =
        channels.filter(item =>
            item.name
            .toLowerCase()
            .includes(keyword)
        );

        renderChannels(filtered);

    }
);
