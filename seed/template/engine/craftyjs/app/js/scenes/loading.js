{
function getAudioAssets(audioFiles) {
    const assets = {}

    audioFiles.forEach((audioFile) => {
        assets[audioFile] = [
            `assets/sfx/${audioFile}.mp3`,
            `assets/sfx/${audioFile}.ogg`,
            `assets/sfx/${audioFile}.wav`
        ]
    })

    return assets
}

Crafty.scene('loading', () => {
    const audioFiles = [
        'bounce',
        'brickDeath',
        'countdownBlip',
        'powerdown',
        'powerup',
        'recover'
    ]

    const assets = {
        audio: getAudioAssets(audioFiles),

        images: {
            tiles: 'assets/tiles.png',
            logo: 'assets/logo.png'
        }
    }

    Crafty.load(assets, () => {
        Crafty.scene('menu')
    })

    Crafty.background('#000')

    Crafty
    .e('2D, DOM, Text')
    .attr({
        w: Crafty.stage.elem.clientWidth,
        h: 20,
        x: 0,
        y: 120
    })
    .text('Loading')
    .css({
        'text-align': 'center'
    })
    .textFont({size: '30px', weight: 'bold'})
})
}