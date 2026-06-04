let player;

function initPlayer(url) {

    if (!player) {
        player = jwplayer("player");
    }

    player.setup({
        file: url,
        width: "100%",
        aspectratio: "16:9",
        autostart: true,
        mute: false,
        stretching: "uniform",
        playbackRateControls: true
    });
}

function playChannel(channel) {

    initPlayer(channel.url);

    document.getElementById("channelName").textContent =
        channel.name;

    document.getElementById("channelCategory").textContent =
        channel.category;

    document.getElementById("channelLogo").src =
        channel.logo;

    localStorage.setItem(
        "lastChannel",
        JSON.stringify(channel)
    );
}
